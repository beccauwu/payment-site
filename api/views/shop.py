from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from accounts.models import Profile
from payments.models import Product, Price, Order
from django.contrib.sessions.models import Session
from django.http import Http404
from ..serializers import ProductSerializer
import general.stripe_stuff as stripe
BASKET_SESSION_ID = 'basket'
class Basket:
    def __init__(self, request):
        if not Session.objects.filter(session_key=request.session.session_key).exists():
            request.session.create()
            print(f'session created: {request.session.session_key}')
        self.session = request.session
        basket = self.session.get(BASKET_SESSION_ID)
        if not basket:
            basket = self.session[BASKET_SESSION_ID] = {}
        self.basket = basket
    def __iter__(self):
        if not self.basket.keys():
            return []
        product_ids = self.basket.keys()
        products = Product.objects.filter(id__in=product_ids)
        for product in products:
            products_list = {
                'id': product.id,
                'prod_name': product.prod_name,
                'price': product.price.price,
                'img': product.get_image(),
                'description': product.get_description(),
                'quantity': self.basket[str(product.id)]['quantity'],
                }
            yield products_list
    def add(self, product, quantity=1, update_quantity=False):
        product_id = str(product.id)
        price = Price.objects.get(product=product)
        if product_id not in self.basket and not update_quantity:
            self.basket[product_id] = {'quantity': 1, 'price': str(price.price)}
        elif update_quantity:
            print(f"quantity: {quantity}")
            if not quantity <= 0 and product_id in self.basket:
                self.basket[product_id]['quantity'] = quantity
            elif quantity == 0:
                self.clear(product)
            elif product_id not in self.basket:
                self.basket[product_id] = {'quantity': quantity, 'price': str(price.price)}
        else:
            self.basket[product_id]['quantity'] += quantity
        print(self.basket)
        self.save()
    def subtract(self, product):
        product_id = str(product.id)
        if product_id in self.basket:
            self.basket[product_id]['quantity'] -= 1
        if not product_id in self.basket:
            return
        if self.basket[product_id]['quantity'] <= 0:
            self.clear(product)
        print(self.basket)
        self.save()
    def save(self):
        self.session.modified = True
    def get_total_price(self):
        p_list = [float(item['price']) * float(item['quantity']) for item in self.basket.values()]
        total = int(sum(p_list) * 100)
        print(f"total price: {total}")
        return total
    def clear(self, product=None, delete_all=False):
        if delete_all:
            del self.session[BASKET_SESSION_ID]
        else:
            product_id = str(product.id)
            if product_id in self.basket:
                del self.basket[product_id]
        self.save()
    def create_session(self):
        line_itms = []
        for itm in list(self):
            line_itms.append({
                'price': itm['price_id'],
                'quantity': itm['quantity'],
            })
        session = stripe.create_session(line_itms)
        return session

class BasketViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    def get_queryset(self):
        basket = Basket(self.request)
        product_ids = basket.basket.keys()
        return Product.objects.filter(id__in=product_ids)

class BasketAPI(APIView):

    def get(self, request):
        basket = Basket(request)
        print(f'basket: {list(basket)}')
        return Response(list(basket))

    def post(self, request, pk):
        basket = Basket(request)
        product_id = pk
        product = Product.objects.get(id=product_id)
        if 'subtract' in request.data:
            if request.data['subtract'] == 'True':
                basket.subtract(product)
                return Response(basket.basket)
        if 'quantity' in request.data:
            basket.add(product, quantity=int(request.data['quantity']), update_quantity=True)
            return Response(basket.basket)
        basket.add(product)
        return Response(basket.basket)
    def delete(self, request, pk=None):
        basket = Basket(request)
        if 'all' in request.data:
            if request.data['all'] == True:
                basket.clear(delete_all=True)
                return Response(basket.basket)
        product_id = pk
        product = Product.objects.get(id=product_id)
        basket.clear(product)
        return Response(basket.basket)

class SessionAPI(APIView):
    def get(self, request):
        basket = Basket(request)
        session = basket.create_session()
        user = None
        if request.user.is_authenticated:
            user = request.user
        order = Order.objects.create(
            user=user,
            session=request.session.session_key,
            stripe_session_id=session['id'],
        )
        order.save()
        return Response({'session_url': session.url})
    def post(self, request):
        basket = Basket(request)
        order = Order.objects.get(stripe_session_id=request.data['session_id'])
        order.completed = True
        order.paid = True
        order.paid_on = datetime.now()
        order.save()
        basket.clear(delete_all=True)
        return Response('success')

class CheckoutAPI(APIView):
    def post(self, request):
        if 'set_id' in request.data:
            print('set client secret')
            request.session['payment_intent_id'] = request.data['payment_intent_id']
            pprint(f"userdata: {request.session.keys()}")
            return Response({'success': 'true'})
        print('checkout post')
        email = request.data['email']
        full_name = request.data['full_name']
        address = dict(
            line1=request.data['line1'],
            city=request.data['city'],
            postal_code=request.data['postal_code'],
            country=request.data['country']
            )
        customer = stripe.get_customer_by_email(email)
        if not customer:
            customer = stripe.create_customer(email, full_name, address)
        request.session['userdata'] = {
            'email': email,
            'full_name': full_name,
            'address': address,
            'customer_id': customer['id'],
            }
        print(request.session['userdata'])
        return Response({'success': 'true'})
    def get(self, request):
        basket = Basket(request)
        currency = 'eur'
        userdata = request.session['userdata']
        if 'userdata' not in request.session.keys():
            request.session['userdata'] = {}
        elif 'payment_intent_id' in userdata.keys():
            intent = stripe.retrieve_payment_intent(userdata['payment_intent_id'])
            print(f"clicent secret: {intent.client_secret}")
            return Response({'client_secret': intent.client_secret})
        intent = stripe.create_payment_intent(basket.get_total_price(), currency)
        request.session['userdata']['payment_intent_id'] = intent.id
        print(f"session: {request.session['userdata']}")
        print(f"clicent secret: {intent.client_secret}")
        return Response({'client_secret': intent.client_secret})

class PaymentIntentUpdate(APIView):
    def get(self, request):
        basket = Basket(request)
        userdata = request.session['userdata']
        intent_id = userdata['payment_intent_id']
        intent = stripe.retrieve_payment_intent(intent_id)
        update = {'customer': userdata['customer_id'], 'amount': basket.get_total_price()}
        intent = stripe.update_payment_intent(intent, update)
        print(f"updated: {intent.client_secret}")
        return Response({'success': 'true'})

class GetProductsAPI(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductAdminAPI(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        product = self.get_object(pk)
        if request.data['delete_drom_stripe'] == 'true':
            product.delete_from_stripe()
        product.delete()
        return Response({'id': request.data['id']})
