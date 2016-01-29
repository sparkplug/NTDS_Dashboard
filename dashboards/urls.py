from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
from django.conf import settings
import views
urlpatterns = patterns('',

                       url(r'^$', login_required(views.home), name='home'),
                       url(r'^messages\.json$', login_required(views.messages_json), name='messages'),
                       url(r'^reporters\.json$', login_required(views.reporters_json), name='reporters'),
                       url(r'^reports\.json$', login_required(views.reports_json), name='reports'),
                       url(r'^locations\.json$', login_required(views.locations_json), name='locations'),
                       url(r'^districts_report\.json$', login_required(views.districts_report_json), name='districts_report_json'),
                       url(r'^diseases_report\.json$', login_required(views.diseases_report_json), name='diseases_report_json'),


                       )

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))


