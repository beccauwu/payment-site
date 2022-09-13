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

urlpatterns = [
    path('shop/', include('api.urlpatterns.shop')),
    path('auth/', include('api.urlpatterns.auth')),
    path('msg/', include('api.urlpatterns.msg')),
]
