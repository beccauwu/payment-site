from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status, generics
from django.contrib.sessions.models import Session
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from accounts.models import CookieConsent, TempSession
from .. import serializers

class LoginAPIView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPIView, self).post(request, format=None)

class UserAPIView(generics.GenericAPIView):
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

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

class RestoreSessionAPIView(APIView):
    def get(self, request):
        if TempSession.objects.filter(username=request.data['username']).exists():
            tempsession = TempSession.objects.get(username=request.data['username'])
            session_data = tempsession.session_data
            if not Session.objects.filter(pk=request.session.session_key).exists():
                request.session.create()
            request.session = session_data
            tempsession.delete()
            return Response({'authenticated': 'true'})
        else:
            return Response({'authenticated': 'false'})
