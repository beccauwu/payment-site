import email
import math
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from payments.models import Order, Product, Price
from messaging.models import Message
from accounts.models import Profile, CookieConsent
from general.models import Review
from general import stripe_stuff as stripe
from django.contrib.auth.hashers import make_password

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user', 'title', 'stars', 'comment', )
    def validate_product(self, value):
        if value is None:
            raise serializers.ValidationError("Product is required")
        return Product.objects.get(id=value)
    def create(self, validated_data):
        request = self.context.get('request')
        review = Review.objects.create(**validated_data)
        return review

class ProductSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField('get_img_url')
    price = serializers.SerializerMethodField('get_price')
    description = serializers.SerializerMethodField('get_desc')
    reviews = serializers.SerializerMethodField('get_reviews')
    average_rating = serializers.SerializerMethodField('get_average_rating')
    def get_img_url(self, obj):
        return obj.get_image()
    def get_price(self, obj):
        return Price.objects.get(product=obj).price
    def get_desc(self, obj):
        return obj.get_description()
    def get_reviews(self, obj):
        reviews = Review.objects.filter(product=obj)
        if reviews:
            return ReviewSerializer(reviews, many=True).data
        return None
    def get_average_rating(self, obj):
        reviews = Review.objects.filter(product=obj)
        ratings = [review.stars for review in reviews]
        if reviews:
            return math.ceil(sum(ratings) / len(ratings))
        return 0
    class Meta:
        model = Product
        fields = ['id', 'prod_name', 'img', 'price', 'description', 'reviews', 'average_rating']

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
        profile_data = validated_data.pop('profile')
        print(f"profile_data: {profile_data}")
        email = validated_data.pop('email')
        full_name = profile_data.pop('full_name')
        username = validated_data.pop('username')
        password = make_password(validated_data.pop('password'))
        address = profile_data.pop('address')
        postcode = profile_data.pop('postcode')
        city = profile_data.pop('city')
        country = profile_data.pop('country')
        customer = stripe.get_customer_by_email(email)
        if customer is None:
            customer = stripe.create_customer(
                email,
                full_name,
                {"line1": address, "postal_code": postcode, "city": city, "country": country})
        try:
            user = User.objects.get(email=email)
            return user
        except User.DoesNotExist:
            user = User.objects.create(
                username=username,
                email=email,
                password=password)
            profile = Profile.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                postcode=postcode,
                city=city,
                country=country,
                stripe_customer_id=customer.id)
            profile.save()
            return user

class CookieUnauthSerializer(serializers.ModelSerializer):
    class Meta:
        model = CookieConsent
        fields = ('consent', 'session')

class CookieAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = CookieConsent
        fields = ('consent', 'user')
