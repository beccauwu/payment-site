from django.urls import path
from .. import views

urlpatterns = [
    path('users/', views.UserAPIView.as_view(), name='user_api'),
    path('users/create/', views.UserAPIView.as_view(), name='user_api'),
    path('status/', views.IsAuthenticated.as_view(), name='is_authenticated'),
]
