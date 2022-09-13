from django.db import models

# Create your models here.

class Message(models.Model):
    sender = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='sender')
    recipient = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='recipient')
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1, blank=True, default='s')

    def __str__(self):
        return f'{self.sender} - {self.recipient} - {self.date}'

