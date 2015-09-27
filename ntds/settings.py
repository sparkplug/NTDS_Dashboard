"""
Django settings for datamart project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = ROOT_PATH = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'b_tv=pejfx-^w(ge9fq#$3f^9kj4)0c=kd(ncg1bn(c727)5t6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'django.contrib.sites',
    'pipeline',
    #'datamart',
    'allauth',
    'djrill',
    'allauth.account',
    'dashboards',
    'djangobower',
    'ws4redis',
    #'redis_sessions',
    #'djcelery',



    #'datamart',

)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #'debug_toolbar.middleware.DebugToolbarMiddleware'
)

ROOT_URLCONF = 'ntds.urls'

WSGI_APPLICATION = 'ntds.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'livinggoods',
        'USER': 'livinggoods',
        'PASSWORD': 'lv072015',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'compressor.finders.CompressorFinder',
    'pipeline.finders.PipelineFinder',
    'djangobower.finders.BowerFinder',
)

PIPELINE_CSS = {
    'colors': {
        'source_filenames': (
          'css/core.css',
          'css/colors/*.css',
          'css/layers.css'
        ),
        'output_filename': 'css/colors.css',
        'extra_context': {
            'media': 'screen,projection',
        },
    },
}

PIPELINE_JS = {
    'stats': {
        'source_filenames': (
          'js/jquery.js',
          'js/d3.js',
          'js/collections/*.js',
          'js/application.js',
        ),
        'output_filename': 'js/stats.js',
    }
}


PIPELINE_COMPILERS = (
  'pipeline.compilers.coffee.CoffeeScriptCompiler',
  'pipeline.compilers.less.LessCompiler',
  'pipeline.compilers.es6.ES6Compiler',
  'react.utils.pipeline.JSXCompiler',
)

STATICFILES_DIRS = (
    os.path.join(ROOT_PATH, "static"),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    "django.core.context_processors.request",
    "django.contrib.auth.context_processors.auth",
    "allauth.account.context_processors.account",
    'ws4redis.context_processors.default',

)


BOWER_COMPONENTS_ROOT = os.path.join(ROOT_PATH, 'components')
JSON_ROOT=os.path.join(ROOT_PATH, 'json')

AUTHENTICATION_BACKENDS = (
# Needed to login by username in Django admin, regardless of `allauth`
'django.contrib.auth.backends.ModelBackend',

# `allauth` specific authentication methods, such as login by e-mail
'allauth.account.auth_backends.AuthenticationBackend',
)

WSGI_APPLICATION = 'ws4redis.django_runserver.application'

TEMPLATE_LOADERS = (
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
        'django.template.loaders.eggs.Loader',
    )),
)
PROJECT_DIR = os.path.join(os.path.abspath(os.path.dirname(__file__)))
TEMPLATE_DIRS = (os.path.join(PROJECT_DIR, 'templates'),)

BOWER_INSTALLED_APPS = (
    'jquery#1.9',
    'lodash',
    'crossfilter',
    'dcjs',
    'colorbrewer',
    'topojson',
    'bootstrap'

)


SITE_ID=1

STATIC_ROOT="/static/"

LOGIN_REDIRECT_URL="/"

SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'

BROKER_HOST = "localhost"
BROKER_BACKEND = "redis"
REDIS_PORT = 6379
REDIS_HOST = "localhost"
BROKER_USER = ""
BROKER_PASSWORD = ""
BROKER_VHOST = "0"
REDIS_DB = 0
REDIS_CONNECT_RETRY = True
CELERY_SEND_EVENTS = True
CELERY_RESULT_BACKEND = 'redis'
CELERY_TASK_RESULT_EXPIRES = 10
CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"
CELERY_DEFAULT_QUEUE = 'lvmart'



# URL that distinguishes websocket connections from normal requests
WEBSOCKET_URL = '/ws/'

# Set the number of seconds each message shall persited
WS4REDIS_EXPIRE = 3600

WS4REDIS_HEARTBEAT = '--heartbeat--'

WS4REDIS_PREFIX = 'demo'
    
    

try:
    from local_settings import *
except Exception as e:
    print 'error',e
