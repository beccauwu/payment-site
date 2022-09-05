from django.urls import path, re_path
from . import views

urlpatterns = [
    path('login/', views.login_request, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout_request, name='logout'),
    path('password_reset/', views.PasswordReset.as_view(), name='password_reset'),
    path('password_reset/done/', views.PasswordResetDone.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password_reset_confirm'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),  
]
