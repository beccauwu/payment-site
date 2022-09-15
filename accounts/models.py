from django.db import models
from datetime import datetime, timedelta

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

class CookieConsent(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, default=None)
    session = models.CharField(max_length=100, blank=True)
    consent = models.BooleanField(default=False)
    date = models.DateTimeField(blank=True, auto_now=True)
    def __str__(self):
        return self.has_expired
    def has_expired(self):
        """Check if cookie consent expired
        Returns:
            bool: True if expired, False if not
        """
        expiry = self.date + timedelta(days=365)
        return expiry <= datetime.now()