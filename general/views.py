from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from .mixins import CustomLoginRequiredMixin
from payments.models import Product, Price, OrderItem
from .stripe_stuff import get_prods, get_basket
# Create your views here.

class HomeView(TemplateView):
    template_name = "home.html"
    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context.update({'nav_home': 'active'})
        print(context)
        return context

class ShopView(CustomLoginRequiredMixin, TemplateView):
    template_name = "shop.html"
    permission_denied_message = 'You have to be logged in to access that page'
    login_url = '/login/'
    def get_context_data(self, **kwargs):
        products = get_prods()
        context = super(ShopView, self).get_context_data(**kwargs)
        context.update({'products': products, 'nav_shop': 'active'})
        print(context)
        return context

class BasketView(TemplateView):
    template_name = "basket.html"

    def get_context_data(self, **kwargs):
        context = super(BasketView, self).get_context_data(**kwargs)
        context_list = []
        for item in OrderItem.objects.filter(user=self.request.user):
            context_list.append(
                {
                    'name': item.product.name,
                    'quantity': item.quantity,
                    'total': item.get_total_item_price(),
                    'prod_id': item.product.id,
                })
        self.request.session['items'] = get_basket(self.request.user)
        context['nav_basket'] = 'active'
        return context

def add_to_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item, created = OrderItem.objects.get_or_create(product=product, user=request.user)
    if not created:
        order_item.quantity += 1
    order_item.save()
    request.session['items'] = get_basket(request.user)
    return redirect(request.META.get('HTTP_REFERER'))

def subtract_from_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item = OrderItem.objects.get(product=product, user=request.user)
    if order_item.quantity > 1:
        order_item.quantity -= 1
        order_item.save()
    else:
        order_item.delete()
    request.session['items'] = get_basket(request.user)
    return redirect(request.META.get('HTTP_REFERER'))

def remove_from_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item = OrderItem.objects.get(product=product, user=request.user)
    order_item.delete()
    request.session['items'] = get_basket(request.user)
    return redirect(request.META.get('HTTP_REFERER'))
