import stripe
from django.conf import settings
from decimal import Decimal
from payments.models import Product, Price, OrderItem
stripe.api_key = settings.STRIPE_SECRET_KEY

def create_session(itms):
    return stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=itms,
            mode='payment',
            success_url=settings.BASE_URL + '/purchases/success/',
            cancel_url=settings.BASE_URL + '/purchases/cancel/',
        ).url

def get_prods():
    response = stripe.Product.list(limit=3)
    objs = []
    for item in response['data']:
        if not item['images']:
            continue
        itm = {}
        p = stripe.Price.retrieve(item['default_price'])['unit_amount_decimal']
        price = None
        itm['price_id'] = item['default_price']
        itm['prod_id'] = item['id']
        itm['price'] = f"{p[0:-2]}.{p[-2:]}"
        itm['img'] = item['images'][0]
        itm['name'] = item['name']
        product, created = Product.objects.get_or_create(
            name=itm['name'],
            stripe_product_id=itm['prod_id']
            )
        if created:
            print(f'created: {product}')
            price = Price.objects.create(
                product=product,
                stripe_price_id=itm['price_id'],
                price=Decimal(itm['price'])
                )
        else:
            print(f'found: {product}')
            price = Price.objects.get(product=product)
        itm['id'] = price.id
        objs.append(itm)
    return objs

def get_basket(user):
    items = []
    for item in OrderItem.objects.filter(user=user):
        itm = {}
        product = stripe.Product.retrieve(item.product.stripe_product_id)
        itm['id'] = item.id
        itm['prod_id'] = product['id']
        itm['quantity'] = item.quantity
        itm['total'] = item.get_total_item_price()
        itm['img'] = product['images'][0]
        items.append(itm)
    return items

def empty_basket(user):
    items = []
    for item in OrderItem.objects.filter(user=user):
        itm = {}
        product = stripe.Product.retrieve(item.product.stripe_product_id)
        itm['id'] = item.id
        itm['prod_id'] = product['id']
        itm['quantity'] = item.quantity
        itm['total'] = item.get_total_item_price()
        itm['img'] = product['images'][0]
        items.append(itm)
        item.delete()
    return items
