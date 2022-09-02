from django.shortcuts import render, redirect
from django.views import View
from django.views.generic import FormView, TemplateView
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import LoginForm, SignupForm

# Create your views here.

class LoginView(View):
    template_name = 'login.html'
    form_class = LoginForm

    def get(self, request):
        if not request.user.is_authenticated:
            form = self.form_class()
            return render(request, self.template_name, {'form': form})
        messages.info(request, 'You are already logged in')
        return redirect(request.META.get('HTTP_REFERER'))
    
    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password']
                )
            if user is not None:
                login(request, user)
                return redirect('home')
        messages.error(request, 'Invalid username or password')
        return render(request, self.template_name, context={'form': form})

class SignupView(View):
    template_name = 'signup.html'
    form_class = SignupForm

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

def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
        messages.info(request, 'Logged out successfully!')
    else:
        messages.error(request, 'You are not logged in')
    return redirect(request.META.get('HTTP_REFERER'))
