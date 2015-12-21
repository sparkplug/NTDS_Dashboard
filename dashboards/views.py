from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from ws4redis.redis_store import RedisMessage
from ws4redis.publisher import RedisPublisher

from django.db import connection
from .utils import HttpJSONResponse,dictfetchall
from django.views.decorators.csrf import csrf_exempt

from django.views.generic.base import View
from ws4redis.publisher import RedisPublisher




#@login_required
def home(request):
    context = {}

    return render_to_response("dashboards/home.html",RequestContext(request,
                                                         context))

def management(request):
    context = {}

    return render_to_response("dashboards/management.html",RequestContext(request,
                                                                   context))

def reports(request):
    context = {}

    return render_to_response("analytics/reports.html",RequestContext(request,
                                                                         context))



def reporters_json(request):
    with connection.cursor() as cursor:
        query="select distinct * from ntds_reporters_mat"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)


def reports_json(request):
    with connection.cursor() as cursor:
        query="select * from ntds_report_mat"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)


def locations_json(request):
    with connection.cursor() as cursor:
        query="select * from flat_loc"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)

def messages_json(request):
    with connection.cursor() as cursor:
        query="select * from reporter_messages_mat where direction ='I' order by date desc"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)

def diseases_report_json(request):
    with connection.cursor() as cursor:
        query="select * from diseases_report_mat"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)

def districts_report_json(request):
    with connection.cursor() as cursor:
        query="select * from districts_report_mat"
        cursor.execute(query)
        data = dictfetchall(cursor)
    return  HttpJSONResponse(data)





    

