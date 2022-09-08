from django.urls import path
from . import views

urlpatterns = [
    path('basket/', views.BasketAPI.as_view(), name='basket_api'),
    path('basket/<int:pk>', views.BasketAPI.as_view(), name='basket_api'),
    path('products/', views.GetProductsAPI.as_view(), name='product_api'),
]
