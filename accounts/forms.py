from django.contrib.auth.models import User
from django.forms import ModelForm

class LoginForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']

class SignupForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
