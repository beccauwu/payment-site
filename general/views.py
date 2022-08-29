from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from payments.models import Product, Price, OrderItem
# Create your views here.

class HomePageView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        prices = Price.objects.all()
        context = super(HomePageView, self).get_context_data(**kwargs)
        context.update({'prices': prices})
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
        self.request.session['items'] = context_list
        return context

def add_to_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item, created = OrderItem.objects.get_or_create(product=product, user=request.user)
    if not created:
        order_item.quantity += 1
    order_item.save()
    return redirect(request.META.get('HTTP_REFERER'))

def subtract_from_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item = OrderItem.objects.get(product=product, user=request.user)
    if order_item.quantity > 1:
        order_item.quantity -= 1
    else:
        order_item.delete()
    return redirect(request.META.get('HTTP_REFERER'))

def remove_from_cart(request, pk):
    product = Product.objects.get(price__id=pk)
    order_item = OrderItem.objects.get(product=product, user=request.user)
    order_item.delete()
    return redirect(request.META.get('HTTP_REFERER'))
