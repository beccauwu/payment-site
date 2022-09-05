from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm, UserCreationForm, PasswordResetForm, SetPasswordForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from django.forms import ModelForm

class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ('username', 'password')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': "form-control giBold text-center"})
        self.fields['password'].widget.attrs.update({'class': "form-control giBold text-center"})
    
    def user_login(self):
        user = authenticate(username=self.cleaned_data['username'], password=self.cleaned_data['password'])
        if user is not None:
            login(self.request, user)

class SignupForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs.update({'class': 'form-control text-center', 'placeholder': 'Password'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control text-center', 'placeholder': 'Confirm Password'})
        self.fields['username'].widget.attrs.update({'class': 'form-control text-center', 'placeholder': 'Username'})
        self.fields['email'].widget.attrs.update({'class': 'form-control text-center', 'placeholder': 'Email'})

class CustomPasswordChangeForm(PasswordChangeForm):
    class Meta:
        model = User
        fields = ('old_password', 'new_password1', 'new_password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['old_password'].widget.attrs.update({'class': 'form-control'})
        self.fields['new_password1'].widget.attrs.update({'class': 'form-control'})
        self.fields['new_password2'].widget.attrs.update({'class': 'form-control'})

class CustomPasswordResetForm(PasswordResetForm):
    class Meta:
        model = User
        fields = ('email',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'class': 'form-control'})
    def get_users(self, email):
        users = super().get_users(email)
        try:
            user = next(users)
            return [user]
        except StopIteration:
            return []

class PasswordSetForm(SetPasswordForm):
    class Meta:
        model = User
        fields = ('new_password1', 'new_password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'})
