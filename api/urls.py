# from django.urls import path
# from . import views

# urlpatterns = [
#     path('basket/', BasketAPI.as_view(), name='basket_api'),
#     path('basket/<int:pk>', BasketAPI.as_view(), name='basket_api'),
#     path('products/', GetProductsAPI.as_view(), name='product_api'),
#     path('checkout/', CheckoutAPI.as_view(), name='checkout_api'),
#     path('users/', UserAPIView.as_view(), name='user_api'),
#     path('users/create/', UserAPIView.as_view(), name='user_api'),
# ]
from django.urls import path, include
from .views import *
from knox import views as knox_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('shop/products', ProductViewSet, basename='products')
router.register('shop/basket/get', BasketViewSet, basename='basket')

urlpatterns = [
    path('shop/basket/', BasketAPI.as_view(), name='basket_api'),
    path('shop/basket/<int:pk>/', BasketAPI.as_view(), name='basket_api'),
    path('shop/basket/delete/', DeleteAll.as_view(), name='delete_all'),
    path('shop/checkout/', CheckoutAPI.as_view(), name='checkout_api'),
    path('shop/checkout/update/', PaymentIntentUpdate.as_view(), name='checkout_update_api'),
    path('auth/users/', UserAPIView.as_view(), name='user_api'),
    path('auth/users/create/', UserAPIView.as_view(), name='user_api'),
    path('auth/status/', IsAuthenticated.as_view(), name='is_authenticated'),
    path('auth/login/', LoginAPIView.as_view(), name='login_api'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout_api'),
    path('common/reviews/', ReviewViewSet.as_view(), name='review_api'),
    path('save/', WriteReadme.as_view(), name='write_readme'),
    path('products/<int:pk>/reviews/', SetReview.as_view(), name='set_review'),
    path('load/', PreloadStripe.as_view(), name='preload_stripe'),
]

urlpatterns += router.urls
