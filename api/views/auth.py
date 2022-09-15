from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status, generics
from django.contrib.sessions.models import Session
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from accounts.models import CookieConsent
from .. import serializers

class UserAPIView(generics.GenericAPIView):
    def get(self, request):
        if request.user.is_authenticated:
            serializer = serializers.UserSerializer(request.user)
            serializer.data['authenticated'] = 'true'
            return Response(serializer.data)
        else:
            return Response({'authenticated': 'false'})
    def post(self, request):
        if not request.user.is_authenticated:
            if request.data['password'] == request.data['password2']:
                serializer = serializers.CreateUserSerializer(data=request.data)
                if serializer.is_valid():
                    user = serializer.save()
                    serializer.data['nomatch'] = 'false'
                    request.session['userdata'] = {
                        'username': serializer.data['username'],
                        'email': serializer.data['email'],
                        'customer_id': serializer.data['profile']['stripe_customer_id'],
                        'full_name': serializer.data['profile']['full_name'],
                        }
                    print(request.session['userdata'])
                    return Response({
                        'user': serializers.UserSerializer(user, context=self.get_serializer_context()).data,
                        'nomatch': 'false',
                        'token': AuthToken.objects.create(user=user)[1]
                        })
                else:
                    return Response(serializer.errors)
            else:
                return Response({'nomatch': 'true'})
        else:
            return Response({'message': "You are already logged in."})
        
class IsAuthenticated(permissions.BasePermission, APIView):
    def get(self, request):
        return Response({'auth': request.user.is_authenticated})

class CookieConsentAPIView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            has_cookie_consent = CookieConsent.objects.filter(user=request.user).exists()
            return Response({'consent': has_cookie_consent})
        else:
            has_cookie_consent = CookieConsent.objects.filter(session=request.session.session_key).exists()
            return Response({'consent': has_cookie_consent})
    def post(self, request):
        if request.data['consent'] == 'false':
            return Response({'consent': 'false'})
        if request.user.is_authenticated:
            serializer=serializers.CookieAuthSerializer(user=request.user, consent=True)
            serializer.save()
            return Response({'consent': 'true'})
        else:
            if not Session.objects.filter(pk=request.session.session_key).exists():
                request.session.create()
            serializer=serializers.CookieUnauthSerializer(session=request.session.session_key, consent=True)
            serializer.save()
            return Response({'consent': 'true'})

class LoginAPIView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPIView, self).post(request, format=None)
