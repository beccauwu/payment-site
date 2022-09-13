from django.urls import path
from .. import views

urlpatterns = [
    path('view/', views.MessageViewSet.as_view({'get': 'list'}), name='msg_api'),
]