"""
ASGI config for shop project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from rest_live.routers import RealtimeRouter
from api import views as msg_views
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop.settings')

router = RealtimeRouter()
router.register(msg_views.MessageViewSet)

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('ws/messages', router.as_consumer().as_asgi(), name='messages'),
            
        ])
    ),
})
