from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.conf import settings
import os

readme = os.path.join(settings.BASE_DIR, 'README.md')

class WriteReadme(APIView):
    def get(self, request):
        file = open(readme, 'r')
        content = file.read()
        return Response({'content': content})
    def post(self, request):
        if request.data['gotten'] == 'false':
            return Response('not retrieved yet')
        elif request.data['gotten'] == 'true':
            file = open(readme, 'w')
            file.write(request.data['content'])
            file.close()
            return Response('written')
        else:
            return Response('error', status=status.HTTP_400_BAD_REQUEST)