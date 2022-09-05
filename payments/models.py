from django.db import models
from accounts.models import Profile
from django.contrib.sessions.models import Session

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    stripe_product_id = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price')
    stripe_price_id = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f'{self.price}'

class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    session = models.ForeignKey(Session, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    paid = models.BooleanField(default=False)
    paid_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.user} - {self.date}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} of {self.product.name}'
    def get_total_item_price(self):
        """Returns the total price for the item"""
        price = Price.objects.get(product=self.product)
        return str(self.quantity * price.price)

