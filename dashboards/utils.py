
from django.http.response import HttpResponse
import json

from django.conf import settings
import os
def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]

class HttpJSONResponse(HttpResponse):
    def __init__(self, data, name=None,*args, **kwargs):
        from django.core.serializers.json import DjangoJSONEncoder
        
        if name:

            serialized = kwargs.pop('serialized', False)
           
        
            kwargs['content_type'] = 'application/json'
        
            kwargs['X-Accel-Redirect'] = '/json/'
            kwargs['Content-Disposition'] = 'attachment; filename=%s.pdf' % (name, ) 
            
            super(HttpJSONResponse, self).__init__(*args, **kwargs)
        else:
            serialized = kwargs.pop('serialized', False)
            if not serialized:
                data_json = json.dumps(data,cls=DjangoJSONEncoder)
            else:
                data_json=data
    
            kwargs['content_type'] = 'application/json'
            super(HttpJSONResponse, self).__init__(data_json, *args, **kwargs)
            