from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from messaging.models import Message
from rest_framework import permissions
from ..serializers import MessageSerializer

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(recipient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
