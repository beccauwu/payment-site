from django.db import models

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

class OrderItem(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='order_item')
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} of {self.product.name}'
    def get_total_item_price(self):
        price = Price.objects.get(product=self.product)
        return str(self.quantity * price.price)

class UserPurchase(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    stripe_charge_id = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
