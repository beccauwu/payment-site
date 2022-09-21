from django.db import models
from payments.models import Product
from accounts.models import Profile
# Create your models here.

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.review.title), filename])

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reviews')
    title = models.CharField(max_length=255)
    stars = models.IntegerField(null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
