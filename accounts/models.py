from django.db import models

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=100, blank=True)
    postcode = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.full_name
