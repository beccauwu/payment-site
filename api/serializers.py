import email
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from payments.models import Order, Product, Price
from messaging.models import Message
from accounts.models import Profile
from general import stripe_stuff as stripe

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
        fields = ['id', 'prod_name', 'img']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('stripe_customer_id', 'full_name', 'address', 'postcode', 'city', 'country',)

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile')

class CreateUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password', 'profile',)

    def create(self, validated_data):
        print(f"validated_data: {validated_data}")
        profile_data = validated_data['profile']
        email = validated_data.pop('email')
        full_name = profile_data.pop('full_name')
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        address = profile_data.pop('address')
        postcode = profile_data.pop('postcode')
        city = profile_data.pop('city')
        country = profile_data.pop('country')
        customer = stripe.create_customer(email, full_name)
        user = User.objects.create(
                username=username,
                email=email,
                password=password)
        user.save()
        profile = Profile.objects.create(
            user = user,
            full_name = full_name,
            address = address,
            postcode = postcode,
            city = city,
            country = country,
            stripe_customer_id = customer.id)
        profile.save()
        return user