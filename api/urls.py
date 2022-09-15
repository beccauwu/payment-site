# from django.urls import path
# from . import views

# urlpatterns = [
#     path('basket/', views.BasketAPI.as_view(), name='basket_api'),
#     path('basket/<int:pk>', views.BasketAPI.as_view(), name='basket_api'),
#     path('products/', views.GetProductsAPI.as_view(), name='product_api'),
#     path('checkout/', views.CheckoutAPI.as_view(), name='checkout_api'),
#     path('users/', views.UserAPIView.as_view(), name='user_api'),
#     path('users/create/', views.UserAPIView.as_view(), name='user_api'),
# ]
from django.urls import path, include
from . import views
from knox import views as knox_views

urlpatterns = [
    path('shop/basket/', views.BasketAPI.as_view(), name='basket_api'),
    path('shop/basket/<int:pk>', views.BasketAPI.as_view(), name='basket_api'),
    path('shop/products/', views.GetProductsAPI.as_view(), name='product_api'),
    path('shop/checkout/', views.CheckoutAPI.as_view(), name='checkout_api'),
    path('shop/checkout/update/', views.PaymentIntentUpdate.as_view(), name='checkout_update_api'),
    path('msg/view/', views.MessageViewSet.as_view({'get': 'list'}), name='msg_api'),
    path('auth/users/', views.UserAPIView.as_view(), name='user_api'),
    path('auth/users/create/', views.UserAPIView.as_view(), name='user_api'),
    path('auth/status/', views.IsAuthenticated.as_view(), name='is_authenticated'),
    path('auth/login/', views.LoginAPIView.as_view(), name='login_api'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout_api'),
]
