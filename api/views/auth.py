from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from ..serializers import UserSerializer, CreateUserSerializer

class UserAPIView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            serializer.data['authenticated'] = 'true'
            return Response(serializer.data)
        else:
            return Response({'authenticated': 'false'})
    def post(self, request):
        if not request.user.is_authenticated:
            if request.data['password'] == request.data['password2']:
                serializer = CreateUserSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    serializer.data['nomatch'] = 'false'
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors)
            else:
                return Response({'nomatch': 'true'})
        else:
            return Response({'message': "You are already logged in."})
        

class IsAuthenticated(permissions.BasePermission, APIView):
    def has_permission(self, request, view):
        return Response({'authenticated': request.user.is_authenticated})
