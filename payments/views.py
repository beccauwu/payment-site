import stripe
from django.conf import settings
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView
from payments.models import Product, Price, OrderItem

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSessionView(View):

    def get(self, request, *args, **kwargs):
        print(self.request.session['items'])
        line_items = []
        for item in request.session["items"]:
            print(f'item: {item}')
            product = Product.objects.get(id=item['prod_id'])
            price = Price.objects.get(product=product)
            line_items.append({
                "price": price.stripe_price_id,
                "quantity": int(item["quantity"])
            })
        print(line_items)
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=settings.BASE_URL + '/purchases/success/',
            cancel_url=settings.BASE_URL + '/purchases/cancel/',
        )
        return redirect(checkout_session.url)

class SuccessView(TemplateView):
    template_name = "success.html"
    def get_context_data(self, **kwargs):
        context = super(SuccessView, self).get_context_data(**kwargs)
        items = OrderItem.objects.filter(user=self.request.user)
        context.update({'order_items': items})
        for item in items:
            item.delete()
        return context

class CancelView(TemplateView):
    template_name = "cancel.html"

