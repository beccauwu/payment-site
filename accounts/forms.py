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
        self.fields['username'].widget.attrs.update(
            {
                'class': "form-control giBold text-center",
                'id': 'loginFormUsername',
                'autocomplete':'username'
            }
        )
        self.fields['password'].widget.attrs.update(
            {
                'class': "form-control giBold text-center mt-2",
                'id': 'loginFormPassword',
                'autocomplete':'current-password'
            }
        )
    
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
        self.fields['password1'].widget.attrs.update(
            {
                'class': 'form-control text-center mt-2',
                'placeholder': 'Password',
                'id': 'signupFormPassword1',
                'autocomplete': 'new-password'
             })
        self.fields['password2'].widget.attrs.update(
            {
                'class': 'form-control text-center mt-2',
                'placeholder': 'Confirm Password',
                'id': 'signupFormPassword2',
                'autocomplete': 'new-password'
            })
        self.fields['username'].widget.attrs.update(
            {
                'class': 'form-control text-center',
                'placeholder': 'Username',
                'id': 'signupFormUsername',
                'autocomplete': 'username'
            }
        )
        self.fields['email'].widget.attrs.update(
            {
                'class': 'form-control text-center mt-2',
                'placeholder': 'Email',
                'id': 'signupFormEmail',
                'autocomplete': 'email'
            }
        )

class CustomPasswordChangeForm(PasswordChangeForm):
    class Meta:
        model = User
        fields = ('old_password', 'new_password1', 'new_password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['old_password'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Old Password', 'id': 'oldPassword'})
        self.fields['new_password1'].widget.attrs.update({'class': 'form-control', 'placeholder': 'New Password', 'id': 'newPassword1'})
        self.fields['new_password2'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Confirm New Password', 'id': 'newPassword2'})

class CustomPasswordResetForm(PasswordResetForm):
    class Meta:
        model = User
        fields = ('email',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update(
            {
                'class': 'form-control my-2 text-center',
                'id': 'resetFormEmail',
                'autocomplete': 'email'
            }
        )
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
