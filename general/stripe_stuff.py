from unicodedata import name
import stripe
from django.conf import settings
from decimal import Decimal
# from payments.models import Product, Price, OrderItem
stripe.api_key = settings.STRIPE_SECRET_KEY

def create_session(itms, customer=None):
    return stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=itms,
            customer=customer,
            mode='payment',
            success_url=settings.BASE_URL + '/purchases/success/',
            cancel_url=settings.BASE_URL + '/purchases/cancel/',
        )

def create_customer(email):
    return stripe.Customer.create(
        email=email
    )

def get_customer_by_email(email=None):
    customer_list = stripe.Customer.list(email=email, limit=1)
    try:
        customer = customer_list['data'][0]
        print(f'Customer {customer.id} found')
        return customer
    except IndexError:
        print('No customer found')
        return None

def retrieve_customer(id):
    return stripe.Customer.retrieve(id)

def create_payment_intent(amount, currency, customer=None):
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency=currency,
        customer=customer,
        payment_method_types=['card'],
    )
    print(intent)
    return intent

def retrieve_payment_intent(id):
    return stripe.PaymentIntent.retrieve(id)

def update_payment_intent(id, customer, amount):
    intent = stripe.PaymentIntent.modify(
        id,
        amount=amount,
        customer=customer
    )
    return intent

def get_description(id):
    return stripe.Product.retrieve(id)['description']

# def get_prods():
#     response = stripe.Product.list(limit=3)
#     objs = []
#     for item in response['data']:
#         if not item['images']:
#             continue
#         itm = {}
#         p = stripe.Price.retrieve(item['default_price'])['unit_amount_decimal']
#         price = None
#         itm['price_id'] = item['default_price']
#         itm['prod_id'] = item['id']
#         itm['price'] = f"{p[0:-2]}.{p[-2:]}"
#         itm['img'] = item['images'][0]
#         itm['name'] = item['name']
#         product, created = Product.objects.get_or_create(
#             name=itm['name'],
#             stripe_product_id=itm['prod_id']
#             )
#         if created:
#             print(f'created: {product}')
#             price = Price.objects.create(
#                 product=product,
#                 stripe_price_id=itm['price_id'],
#                 price=Decimal(itm['price'])
#                 )
#             product.img = itm['img']
#             product.save()
#         else:
#             print(f'found: {product}')
#             price = Price.objects.get(product=product)
#             if product.img != itm['img']:
#                 product.img = itm['img']
#                 product.save()
#         itm['id'] = price.id
#         objs.append(itm)
#     return objs

# def get_basket(order):
#     items = []
#     for item in OrderItem.objects.filter(order=order):
#         itm = {}
#         product = stripe.Product.retrieve(item.product.stripe_product_id)
#         itm['id'] = item.id
#         itm['prod_id'] = product['id']
#         itm['quantity'] = item.quantity
#         itm['total'] = item.get_total_item_price()
#         itm['img'] = product['images'][0]
#         items.append(itm)
#     return items

# def empty_basket(order):
#     items = []
#     for item in OrderItem.objects.filter(order=order):
#         itm = {}
#         product = stripe.Product.retrieve(item.product.stripe_product_id)
#         itm['id'] = item.id
#         itm['prod_id'] = product['id']
#         itm['quantity'] = item.quantity
#         itm['total'] = item.get_total_item_price()
#         itm['img'] = product['images'][0]
#         items.append(itm)
#         item.delete()
#     return items

def delete_product(id):
    return stripe.Product.delete(id)

def get_image(id):
    return stripe.Product.retrieve(id)['images'][0]
