from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import FormView, TemplateView
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from . import forms

# Create your views here.

class LoginView(View):
    template_name = 'login.html'
    form_class = forms.LoginForm

    def get(self, request):
        if not request.user.is_authenticated:
            form = self.form_class()
            return render(request, self.template_name, {'form': form, 'nav_login': 'active'})
        messages.info(request, 'You are already logged in')
        return redirect(request.META.get('HTTP_REFERER'))
    
    def post(self, request):
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password']
            )
        if user is not None:
            if user.is_active:
                login(request, user)
                messages.success(request, 'You are now logged in')
                return redirect('home')
            else:
                messages.error(request, 'Your account is disabled')
                return redirect('signup')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')

class SignupView(View):
    template_name = 'signup.html'
    form_class = forms.SignupForm

    def get(self, request):
        form = self.form_class()
        return render(request, self.template_name, context={'form': form})
    
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password']
                )
            user.save()
            return redirect('login')
        messages.error(request, 'Invalid username or password')
        return render(request, self.template_name, context={'form': form})

class PasswordReset(SuccessMessageMixin, PasswordResetView):
    template_name = 'password_reset.html'
    email_template_name = 'password_reset_email.html'
    subject_template_name = 'password_reset_subject.txt'
    form_class = forms.CustomPasswordResetForm
    success_message = "We've emailed you instructions for setting your password, "\
                    "if an account exists with the email you entered. You should receive them shortly. "\
                    "If you don't receive an email, please make sure you've entered the address you registered with, "\
                    "and check your spam folder."
    success_url = '/accounts/password_reset/done/'

class PasswordResetDone(PasswordResetDoneView):
    template_name = 'password_reset_done.html'
    def get(self, request, *args, **kwargs):
        super().get(request, *args, **kwargs)
        messages.info(request, 'Check your email for a link to reset your password')

class PasswordResetConfirm(SuccessMessageMixin, PasswordResetConfirmView):
    template_name = 'password_reset_confirm.html'
    form_class = forms.PasswordSetForm
    post_reset_login = True
    success_url = 'home'
    success_message = 'Your password has been set. You are now logged in.'
    

def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
        messages.info(request, 'Logged out successfully!')
    else:
        messages.error(request, 'You are not logged in')
    return redirect(request.META.get('HTTP_REFERER'))
