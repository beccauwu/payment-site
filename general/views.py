from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.sessions.models import Session
from .mixins import CustomLoginRequiredMixin
from payments.models import Product, Price, Order, OrderItem
# from .stripe_stuff import get_prods, get_basket
from pprint import pprint
from shop.frequents import Messages, referrer_redirect
# Create your views here.

class HomeView(TemplateView):
    template_name = "home.html"
    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context.update({'nav_home': 'active'})
        print(context)
        return context

class ShopView(TemplateView):
    template_name = "shop.html"
    permission_denied_message = 'You have to be logged in to access that page'
    login_url = '/login/'
    def get_context_data(self, **kwargs):
        if not Session.objects.filter(session_key=self.request.session.session_key).exists():
            self.request.session.create()
            print(f'session created: {self.request.session.session_key}')
        if not 'products' in self.request.session:
            self.request.session['products'] = get_prods()
        products = self.request.session['products']
        some_dict = {}
        for key, vals in self.request.session.items():
            num = 0
            for val in vals:
                some_dict[f'{key}{num}'] = val
                num += 1
        pprint(some_dict)
        context = super(ShopView, self).get_context_data(**kwargs)
        context.update({'products': products, 'nav_shop': 'active'})
        return context

class BasketView(TemplateView):
    template_name = "basket.html"

class CheckoutView(TemplateView):
    template_name = "checkout.html"

#     def get_context_data(self, **kwargs):
#         context = super(BasketView, self).get_context_data(**kwargs)
#         context_list = []
#         order = Order.objects.filter(session=self.request.session)
#         for item in OrderItem.objects.filter(order=order):
#             context_list.append(
#                 {
#                     'name': item.product.name,
#                     'quantity': item.quantity,
#                     'total': item.get_total_item_price(),
#                     'prod_id': item.product.id,
#                 })
#         self.request.session['items'] = get_basket(self.request.user)
#         context['nav_basket'] = 'active'
#         return context

class APITest(TemplateView):
    template_name = "test_api.html"

# def add_to_cart(request, pk):
#     product = Product.objects.get(price__id=pk)
#     session_key = request.session.session_key
#     if not Session.objects.filter(session_key=request.session.session_key).exists():
#         request.session.create()
#         print(f'session created: {session_key}')
#     if request.user.is_authenticated:
#         order, order_created = Order.objects.get_or_create(user=request.user, session=session_key)
#     else:
#         order, order_created = Order.objects.get_or_create(session=session_key)
#     order.save()
#     order_item, item_created = OrderItem.objects.get_or_create(order=order, product=product)
#     if not item_created:
#         order_item.quantity += 1
#     order_item.save()
#     request.session['items'] = get_basket(order)
#     print(request.session['items'])
#     return redirect(request.META.get('HTTP_REFERER'))

# def subtract_from_cart(request, pk):
#     product = Product.objects.get(price__id=pk)
#     if request.user.is_authenticated:
#         order = Order.objects.get(product=product, user=request.user)
#     else:
#         order = Order.objects.get(product=product, session=request.session)
#     order_item = OrderItem.objects.get(product=product, order=order)
#     if order_item.quantity > 1:
#         order_item.quantity -= 1
#         order_item.save()
#     else:
#         order_item.delete()
#     request.session['items'] = get_basket(order)
#     return redirect(request.META.get('HTTP_REFERER'))

# def remove_from_cart(request, pk):
#     order = Order.objects.get(session=request.session)
#     product = Product.objects.get(price__id=pk)
#     order_item = OrderItem.objects.get(product=product, user=request.user)
#     order_item.delete()
#     request.session['items'] = get_basket(request.user)
#     return redirect(request.META.get('HTTP_REFERER'))
