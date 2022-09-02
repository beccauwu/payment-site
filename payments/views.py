from django.conf import settings
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView
from payments.models import Product, Price, OrderItem
import general.stripe_stuff as stripe_funcs

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
        return redirect(stripe_funcs.create_session(line_items))

class SuccessView(TemplateView):
    template_name = "success.html"
    def get_context_data(self, **kwargs):
        context = super(SuccessView, self).get_context_data(**kwargs)
        items = stripe_funcs.empty_basket(self.request.user)
        context.update({'items': items})
        self.request.session['items'].clear()
        return context

class CancelView(TemplateView):
    template_name = "cancel.html"

