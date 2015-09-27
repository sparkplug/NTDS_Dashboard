from django.conf.urls import patterns, include, url

from django.contrib import admin
from dashboards.urls import urlpatterns as analytics
admin.autodiscover()


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'datamart.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    (r'^accounts/', include('allauth.urls')),
)+ analytics
