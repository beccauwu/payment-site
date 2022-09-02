from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('shop/', views.ShopView.as_view(), name='shop'),
    path('basket/', views.BasketView.as_view(), name='basket'),
    path('basket/add/<int:pk>', views.add_to_cart, name='add_to_cart'),
    path('basket/subtract/<int:pk>', views.subtract_from_cart, name='subtract_from_cart'),
    path('basket/remove/<int:pk>', views.remove_from_cart, name='remove_from_cart'),
]
