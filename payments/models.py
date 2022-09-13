from unicodedata import category
from django.db import models
from accounts.models import Profile
from django.contrib.sessions.models import Session
import general.stripe_stuff as stripe

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    prod_name = models.CharField(max_length=255)
    stripe_product_id = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    img = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.prod_name
    def get_image(self):
        return stripe.get_image(self.stripe_product_id)
    def delete_from_stripe(self):
        return stripe.delete_product(self.stripe_product_id)

class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price')
    stripe_price_id = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f'{self.price}'

class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    session = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    paid = models.BooleanField(default=False)
    paid_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.user} - {self.date}'
    def create_stripe_session(self, items):
        stripe_session = stripe.create_session(self.session)
        self.stripe_session_id = stripe_session['id']

