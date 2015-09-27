
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection
import os
import gzip
import json
import shutil


class Command(BaseCommand):
   
    def handle(self, **options):
        from django.core.serializers.json import DjangoJSONEncoder
        
        with connection.cursor() as cursor:
            query="select * from households_mat_view"
            cursor.execute(query)
            data = cursor.fetchall()
        d_json=[x[0] for x in data]
        with open(os.path.join(settings.JSON_ROOT,"households.json"), 'w') as outfile:
            json.dump(d_json, outfile,cls=DjangoJSONEncoder)
            
        with open(os.path.join(settings.JSON_ROOT,"households.json"), 'rb') as f_in, gzip.open(os.path.join(settings.JSON_ROOT,'households.json.gz'), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
            
            
        with connection.cursor() as cursor:
            query="select * from treatments_mat_view"
            cursor.execute(query)
            data = cursor.fetchall()
        d_json=[x[0] for x in data]
        with open(os.path.join(settings.JSON_ROOT,"treatments.json"), 'w') as outfile:
            json.dump(d_json, outfile,cls=DjangoJSONEncoder)
            
        with open(os.path.join(settings.JSON_ROOT,"treatments.json"), 'rb') as f_in, gzip.open(os.path.join(settings.JSON_ROOT,'treatments.json.gz'), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
            
            
        with connection.cursor() as cursor:
            query="select * from pregnancies_mat_view"
            cursor.execute(query)
            data = cursor.fetchall()
        d_json=[x[0] for x in data]
        with open(os.path.join(settings.JSON_ROOT,"pregnancies.json"), 'w') as outfile:
            json.dump(d_json, outfile,cls=DjangoJSONEncoder)
            
        with open(os.path.join(settings.JSON_ROOT,"pregnancies.json"), 'rb') as f_in, gzip.open(os.path.join(settings.JSON_ROOT,'pregnancies.json.gz'), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)