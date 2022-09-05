from django.db import models

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
