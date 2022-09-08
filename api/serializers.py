from rest_framework import serializers
from payments.models import Order, OrderItem, Product, Price

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField('get_img_url')
    def get_img_url(self, obj):
        return obj.get_image()
    class Meta:
        model = Product
        fields = ['id', 'name', 'img']
