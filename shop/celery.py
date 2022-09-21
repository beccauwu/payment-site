import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop.settings')
app = Celery('shop')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.beat_schedule = {
    "every day at 6am": {
        "task": "execute_session_cleanup",
        "schedule": crontab(hour='6',minute='0',)
    },
    "every minute": {
        "task": "check_if_need_update_prices",
        'schedule': 60.0,
    }
}
app.autodiscover_tasks()
