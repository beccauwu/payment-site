from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('shop/', views.ShopView.as_view(), name='shop'),
    path('basket/', views.BasketView.as_view(), name='basket'),
    path('testint/', views.APITest.as_view(), name='test'),
    path('checkout/', views.CheckoutView.as_view(), name='checkout'),
    path('checkout/success/', views.CheckoutSuccessView.as_view(), name='checkout_success'),
]
