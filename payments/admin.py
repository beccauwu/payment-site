from django.contrib import admin
from .models import Product, Price

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'stripe_product_id')
    search_fields = ('name', 'stripe_product_id')

class PriceAdmin(admin.ModelAdmin):
    list_display = ('product', 'stripe_price_id', 'price')
    search_fields = ('product', 'stripe_price_id', 'price')

admin.site.register(Product, ProductAdmin)
admin.site.register(Price, PriceAdmin)
