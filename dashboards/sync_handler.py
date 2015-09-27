import hashlib
import json
import logging
import os
import signal
import time
import uuid

from urllib.parse import urlparse

from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from django.utils.crypto import constant_time_compare
from redis import Redis
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.options import define, parse_command_line, options
from tornado.web import Application, RequestHandler, HTTPError
from tornado.websocket import WebSocketHandler
from tornadoredis import Client
from tornadoredis.pubsub import BaseSubscriber


define('debug', default=False, type=bool, help='Run in debug mode')
define('port', default=8080, type=int, help='Server port')
define('allowed_hosts', default="localhost:8080", multiple=True,
       help='Allowed hosts for cross domain connections')
       
       
connection = psycopg2.connect('dbname=mydatabase user=ivan password=mypassword')
connection.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)


def listen():    
    cursor = connection.cursor()
    cursor.execute("LISTEN test_channel;")
 
def receive(fd, events):
    '''Receive a notify message from the channel we are listening.'''
    state = connection.poll()
    if state == psycopg2.extensions.POLL_OK:
        if connection.notifies:
            notify = connection.notifies.pop()
            print "New notify message"    
            cursor = connection.cursor()
            cursor.execute("SELECT latitude, longitude FROM mydata ORDER BY date_added DESC LIMIT 1;")
            result=cursor.fetchone()
            lat=result[0]
            lon=result[1]
            json_object = json.dumps([lat, lon])
            for ws in websockets:
                ws.write_message(json_object)  
                
                


class RedisSubscriber(BaseSubscriber):

    def on_message(self, msg):
        """Handle new message on the Redis channel."""
        if msg and msg.kind == 'message':
            try:
                message = json.loads(msg.body)
                sender = message['sender']
                message = message['message']
            except (ValueError, KeyError):
                message = msg.body
                sender = None
            subscribers = list(self.subscribers[msg.channel].keys())
            for subscriber in subscribers:
                if sender is None or sender != subscriber.uid:
                    try:
                        subscriber.write_message(message)
                    except tornado.websocket.WebSocketClosedError:
                        # Remove dead peer
                        self.unsubscribe(msg.channel, subscriber)
        super().on_message(msg)



class EchoHandler(WebSocketHandler):

    def open(self):
        self.write_message('connected!')
        if self not in websockets:
            websockets.append(self)

    def on_message(self, message):
        self.write_message("You've sent: "+message)

    def on_close(self):
        print 'connection closed'
        if self in websockets:
            websockets.remove(self)
            
            
class DatamartHandler(WebSocketHandler):
    """Handles real-time updates to the datamart"""

    def check_origin(self, origin):
        allowed = super().check_origin(origin)
        parsed = urlparse(origin.lower())
        matched = any(parsed.netloc == host for host in options.allowed_hosts)
        return options.debug or allowed or matched

    def open(self):
        """Subscribe to sprint updates on a new connection."""
        self.sprint = None
        channel = self.get_argument('channel', None)
        if not channel:
            self.close()
        else:
            try:
                self.sprint = self.application.signer.unsign(
                    channel, max_age=60 * 30)
            except (BadSignature, SignatureExpired):
                self.close()
            else:
                self.uid = uuid.uuid4().hex
                self.application.add_subscriber(self.sprint, self)

    def on_message(self, message):
        """Broadcast updates to other interested clients."""
        if self.sprint is not None:
            self.application.broadcast(message, channel=self.sprint, sender=self)

    def on_close(self):
        """Remove subscription."""
        if self.sprint is not None:
            self.application.remove_subscriber(self.sprint, self)


class UpdateHandler(RequestHandler):
    """Handle updates from the Django application."""

    def post(self, model, pk):
        self._broadcast(model, pk, 'add')

    def put(self, model, pk):
        self._broadcast(model, pk, 'update')

    def delete(self, model, pk):
        self._broadcast(model, pk, 'remove')

    def _broadcast(self, model, pk, action):
        signature = self.request.headers.get('X-Signature', None)
        if not signature:
            raise HTTPError(400)
        try:
            result = self.application.signer.unsign(signature, max_age=60 * 1)
        except (BadSignature, SignatureExpired):
            raise HTTPError(400)
        else:
            expected = '{method}:{url}:{body}'.format(
                method=self.request.method.lower(),
                url=self.request.full_url(),
                body=hashlib.sha256(self.request.body).hexdigest(),
            )
            if not constant_time_compare(result, expected):
                raise HTTPError(400)
        try:
            body = json.loads(self.request.body.decode('utf-8'))
        except ValueError:
            body = None
        message = json.dumps({
            'model': model,
            'id': pk,
            'action': action,
            'body': body,
        })
        self.application.broadcast(message)
        self.write("Ok")


class DatamartApplication(Application):

    def __init__(self, **kwargs):
        routes = [
            (r'/socket', DatamartHandler),
            (r'/(?P<model>task|sprint|user)/(?P<pk>[0-9]+)', UpdateHandler),
            (r'/websocket', EchoHandler),
            
        ]
        super().__init__(routes, **kwargs)
        self.subscriber = RedisSubscriber(Client())
        self.publisher = Redis()
        self._key = os.environ.get('WATERCOOLER_SECRET',
            'pTyz1dzMeVUGrb0Su4QXsP984qTlvQRHpFnnlHuH')
        self.signer = TimestampSigner(self._key)

    def add_subscriber(self, channel, subscriber):
        self.subscriber.subscribe(['all', channel], subscriber)

    def remove_subscriber(self, channel, subscriber):
        self.subscriber.unsubscribe(channel, subscriber)
        self.subscriber.unsubscribe('all', subscriber)

    def broadcast(self, message, channel=None, sender=None):
        channel = 'all' if channel is None else channel
        message = json.dumps({
            'sender': sender and sender.uid,
            'message': message
        })
        self.publisher.publish(channel, message)


def shutdown(server):
    ioloop = IOLoop.instance()
    logging.info('Stopping server.')
    server.stop()

    def finalize():
        ioloop.stop()
        logging.info('Stopped.')

    ioloop.add_timeout(time.time() + 1.5, finalize)


if __name__ == "__main__":
    parse_command_line()
    application = DatamartApplication(debug=options.debug)
    server = HTTPServer(application)
    server.listen(options.port)
    signal.signal(signal.SIGINT, lambda sig, frame: shutdown(server))
    logging.info('Starting server on localhost:{}'.format(options.port))
    IOLoop.instance().start()