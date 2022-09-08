from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from payments.models import Product, Price
from django.contrib.sessions.models import Session
from django.http import Http404
from .serializers import ProductSerializer
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
        print('iter accessed')
        product_ids = self.basket.keys()
        products = Product.objects.filter(id__in=product_ids)
        for product in products:
            self.basket[str(product.id)]['product'] = product
        for item in self.basket.values():
            item['price'] = float(item['price'])
            item['total_price'] = item['price'] * item['quantity']
            yield item
    def add(self, product, quantity=1, update_quantity=False):
        product_id = str(product.id)
        price = Price.objects.get(product=product)
        if product_id not in self.basket:
            self.basket[product_id] = {'quantity': 0, 'price': str(price.price)}
        if update_quantity:
            self.basket[product_id]['quantity'] = quantity
        else:
            self.basket[product_id]['quantity'] += quantity
        print(self.basket)
        self.save()
    def subtract(self, product):
        product_id = str(product.id)
        if product_id in self.basket:
            self.basket[product_id]['quantity'] -= 1
        print(self.basket)
        self.save()
    def save(self):
        self.session.modified = True
    def get_total_price(self):
        return sum(float(item['price']) * float(item['quantity']) for item in self.basket.values())
    def clear(self, product=None, delete_all=False):
        if delete_all:
            del self.session[BASKET_SESSION_ID]
        else:
            product_id = str(product.id)
            if product_id in self.basket:
                del self.basket[product_id]
        self.save()

class BasketAPI(APIView):

    def get(self, request):
        basket = Basket(request)
        return Response(basket.basket)

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
