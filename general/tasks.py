from celery import shared_task, states
from django.core import management
@shared_task(bind=True, name='execute_session_cleanup', max_retries=3, soft_time_limit=20)
def execute_session_cleanup():
    """Cleanup expired sessions by using Django management command."""
    management.call_command("clearsessions", verbosity=0)
