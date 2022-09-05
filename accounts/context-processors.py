from .forms import LoginForm, SignupForm

def account_forms(request):
    return {
        'login_form': LoginForm(),
        'signup_form': SignupForm()
    }
