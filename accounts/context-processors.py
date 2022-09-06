from .forms import LoginForm, SignupForm, CustomPasswordResetForm
import json

def account_forms(request):
    return {
        'login_form': LoginForm(),
        'signup_form': SignupForm(),
        'reset_form': CustomPasswordResetForm()
    }
