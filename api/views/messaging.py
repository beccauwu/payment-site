from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from  django.conf  import settings
import requests
from messaging.models import Message
from rest_framework import permissions
from ..serializers import MessageSerializer

API_KEY = settings.ANYMAIL.get('MAILGUN_API_KEY')

@api_view(['POST'])
def add_to_newsletter(request):
    email = request.data.get('email')
    if email:
        response = requests.post(
            "https://api.mailgun.net/v3/lists/newsletter@mail.perttula.co/members",
            auth=("api", API_KEY),
            data={"subscribed": True, "address": email}
        )
        return Response(response.json())
    else:
        return Response({'error': 'Email not provided'})
