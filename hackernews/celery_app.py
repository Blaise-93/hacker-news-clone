import os
from celery import Celery
import django
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hackernews.settings')

app = Celery('hackernews')
app.config_from_object('django.conf:settings')
django.setup()
app.autodiscover_tasks()


from news.tasks import fetch_and_sync_hacker_news
