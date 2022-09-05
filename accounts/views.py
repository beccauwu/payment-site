from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.utils.translation import gettext_lazy as _
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.messages.views import SuccessMessageMixin
from django.template.loader import render_to_string  
from django.utils.encoding import force_bytes, force_str  
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode 
from .tokens import account_activation_token  
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage  
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from . import forms
import json
# Create your views here.

class PasswordReset(SuccessMessageMixin, PasswordResetView):
    template_name = 'users/password_reset.html'
    email_template_name = 'users/password_reset_email.html'
    subject_template_name = 'users/password_reset_subject.txt'
    form_class = forms.CustomPasswordResetForm
    success_message = "We've emailed you instructions for setting your password, "\
                    "if an account exists with the email you entered. You should receive them shortly. "\
                    "If you don't receive an email, please make sure you've entered the address you registered with, "\
                    "and check your spam folder."
    success_url = '/users/password_reset/done/'

class PasswordResetDone(PasswordResetDoneView):
    template_name = 'users/password_reset_done.html'

class PasswordResetConfirm(SuccessMessageMixin, PasswordResetConfirmView):
    template_name = 'users/password_reset_confirm.html'
    form_class = forms.PasswordSetForm
    post_reset_login = True
    success_url = '/'
    success_message = 'Your password has been set. You are now logged in.'
    

def login_request(request):
    if request.method == 'POST':
        form = forms.LoginForm(request=request, data=request.POST)
        if form.is_valid():
            form.user_login()
            messages.success(request, _('You have successfully logged in!'))
            if '/user/logout/' in request.get_full_path():
                return redirect('/')
            return redirect(request.META.get('HTTP_REFERER'))
        else:
            messages.error(request, 'Wrong username or password.')
            return redirect('home')

def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
        messages.info(request, 'Logged out successfully!')
    else:
        messages.error(request, 'You are not logged in')
    return redirect(request.META.get('HTTP_REFERER'))

def signup(request):
    if request.method == 'POST':
        form = forms.SignupForm(request.POST)
        print(form.errors)
        print(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            mail_subject = 'shopsite: Activate your account.'
            to_email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            message = EmailMessage(
                from_email="noreply@mail.perttula.co",
                subject=mail_subject,
                to=[to_email]
                )
            message.template_id = 'account_confirmation'
            substitutions = {
                'user': username,
                'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
                }
            message.extra_headers['X-Mailgun-Variables'] = json.dumps(substitutions)
            message.send()
            messages.success(request, _('You have successfully registered!\nplease check your email to activate your account.'))
            return redirect('home')
        else:
            return redirect('home')

def activate(request, uidb64, token):  
    if uidb64 == 'test_uidb64' and token == 'test_token':
        messages.success(request, _('It works!'))
        return redirect('home')
    else:
        User = get_user_model()  
        try:  
            uid = force_str(urlsafe_base64_decode(uidb64))  
            user = User.objects.get(pk=uid) 
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):  
            user = None  
        if user is not None and account_activation_token.check_token(user, token):  
            user.is_active = True
            user.save()
            messages.success(request, _('You have successfully activated your account!\nYou can now login.'))
            return redirect('home')
        else: 
            messages.error(request, _('Activation link is invalid!'))
            return redirect('home')  

def password_reset(request):
    if request.method == 'POST':
        form = forms.CustomPasswordResetForm(request.POST)
        if form.is_valid():
            form.save()
            mail_subject = 'shopsite: Reset password.'
            to_email = form.cleaned_data.get('email')
            user = form.get_users(to_email)[0]
            if user is not None:
                username = user.username
                message = EmailMessage(
                    from_email="noreply@mail.perttula.co",
                    subject=mail_subject,
                    to=[to_email]
                    )
                message.template_id = 'password_reset'
                substitutions = {
                    'user': username,
                    'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                    }
                message.extra_headers['X-Mailgun-Variables'] = json.dumps(substitutions)
                message.send()
                messages.success(request, _('We have sent you an email with instructions on how to reset your password.'))
                return redirect('home')
            else:
                messages.error(request, _('Email not found.'))
                return redirect('home')
        else:
            messages.error(request, _('Invalid email address!'))
            return redirect('home')
