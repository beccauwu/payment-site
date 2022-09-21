from rest_framework.response import Response
from rest_framework import permissions, status, generics, views
from ..serializers import ReviewSerializer
from general.models import Review


class ReviewViewSet(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get(self, request, pk):
        queryset = Review.objects.filter(product__id=pk)
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if not request.user.is_authenticated:
            return Response('You are not logged in', status=status.HTTP_401_UNAUTHORIZED)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        if not request.user.is_authenticated:
            return Response('You are not logged in', status=status.HTTP_401_UNAUTHORIZED)
        review = Review.objects.get(id=pk)
        serializer = ReviewSerializer(instance=review, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_authenticated:
            return Response('You are not logged in', status=status.HTTP_401_UNAUTHORIZED)
        review = Review.objects.get(id=pk)
        review.delete()
        return Response('Item succsesfully deleted!')

class ImageUploadView(views.APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response('You are not logged in', status=status.HTTP_401_UNAUTHORIZED)
        serializer = ImageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
