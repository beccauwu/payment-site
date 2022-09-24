from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.conf import settings
from payments.models import Product, Price
from general.stripe_stuff import stripe
from decimal import Decimal
import os

readme = os.path.join(settings.BASE_DIR, 'README.md')

class WriteReadme(APIView):
    def get(self, request):
        file = open(readme, 'r')
        content = file.read()
        return Response({'content': content})
    def post(self, request):
        if request.data['gotten'] == 'false':
            return Response('not retrieved yet')
        elif request.data['gotten'] == 'true':
            file = open(readme, 'w')
            file.write(request.data['content'])
            file.close()
            return Response('written')
        else:
            return Response('error', status=status.HTTP_400_BAD_REQUEST)

class PreloadStripe(APIView):
    def get(self, request):
        try:
            response = stripe.Product.list()
            created = 0
            for itm in response['data']:
                if Product.objects.filter(stripe_id=itm['id']).exists():
                    continue
                else:
                    product = Product.objects.create(
                        name=itm['name'],
                        stripe_id=itm['id'],
                        description=itm['description']
                    )
                    price_id = itm['default_price']
                    price = stripe.Price.retrieve(price_id)['unit_amount_decimal']
                    Price.objects.create(
                        product = product,
                        stripe_price_id = price_id,
                        price = Decimal(f"{price[0:-2]}.{price[-2:]}")
                    )
                    created += 1
            return Response(f'Preload successful. {created} new instances created', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'Preload failed. {e}', status=status.HTTP_418_IM_A_TEAPOT)
