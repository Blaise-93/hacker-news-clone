import os
from pathlib import Path
from celery.schedules import crontab

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-jp2$^+mn=od3jv_u1gnej0)tkm0dl0_bv#o=nyms=!*mq7*nv('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # local apps
    'news',
    'profiles',

    # third party apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'celery',
    'tailwind',
    'rest_framework',  # Shared API for subscriptions
    'corsheaders',
    'django_celery_beat',
    'django_celery_results'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hackernews.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'hackernews.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

AUTH_USER_MODEL = 'profile.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = 'static_root'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
TEMPLATE_DEBUG = True


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Celery
# ------------------------------------------------------------------------------
if USE_TZ:
    CELERY_TIMEZONE = TIME_ZONE

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")

CELERY_RESULT_BACKEND = CELERY_BROKER_URL

CELERY_BEAT_SCHEDULE = {

    "fetch_hacker_news": {
        "task":
        "news.tasks.fetch_hacker_news",
        "schedule": crontab(minute='*/5'),
        # hour=16, minute=43 run daily at midnight
    },



}


# settings.py
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'django-db'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Africa/Lagos'


CELERY_RESULT_EXTENDED = True

CELERY_RESULT_BACKEND_ALWAYS_RETRY = True

CELERY_RESULT_BACKEND_MAX_RETRIES = 10

CELERY_ACCEPT_CONTENT = ["json"]

CELERY_TASK_SERIALIZER = "json"

CELERY_RESULT_SERIALIZER = "json"

CELERY_TASK_TIME_LIMIT = 5 * 60

CELERY_TASK_SOFT_TIME_LIMIT = 60


CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

CELERY_WORKER_SEND_TASK_EVENTS = True
# https://docs.celeryq.dev/en/stable/userguide/configuration.html#std-setting-task_send_sent_event
CELERY_TASK_SEND_SENT_EVENT = True


# CACHES
# ------------------------------------------------------------------------------
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.getenv("REDIS_URL"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            # Mimicing memcache behavior.
            # https://github.com/jazzband/django-redis#memcached-exceptions-behavior
            "IGNORE_EXCEPTIONS": True,
        },
    },
}


CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:3000',
    'http://localhost:5173',

]


# Restframework Permissions
# https://openfolder.sh/django-tutorial-as-you-type-search-with-ajax

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        'rest_framework.permissions.AllowAny'
    ]
}
