from django.conf import settings
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView
from payments.models import Product, Price, Order
import general.stripe_stuff as stripe_funcs

# class CreateCheckoutSessionView(View):

#     def get(self, request, *args, **kwargs):
#         print(self.request.session['items'])
#         line_items = []
#         for item in request.session["items"]:
#             print(f'item: {item}')
#             product = Product.objects.get(id=item['prod_id'])
#             price = Price.objects.get(product=product)
#             line_items.append({
#                 "price": price.stripe_price_id,
#                 "quantity": int(item["quantity"])
#             })
#         print(line_items)
#         session = stripe_funcs.create_session(line_items)
#         self.request.session['stripe_session_id'] = session.id
#         return redirect(session.url)

# class SuccessView(TemplateView):
#     template_name = "success.html"
#     def get_context_data(self, **kwargs):
#         context = super(SuccessView, self).get_context_data(**kwargs)
#         order = Order.objects.get(
#             session=self.request.session.session_key,
#             completed=False
#             )
#         if self.request.user.is_authenticated:
#             order.user = self.request.user
#         items = stripe_funcs.empty_basket(order)
#         order.completed = True
#         order.stripe_session_id = self.request.session['stripe_session_id']
#         order.save()
#         self.request.session['stripe_session_id'] = None
#         context.update({'items': items})
#         self.request.session['items'].clear()
#         return context

class CancelView(TemplateView):
    template_name = "cancel.html"

