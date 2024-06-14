from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import AvancesSerializer, ImgAvanceSerializer
from .models import Advancements
from rest_framework import status, viewsets
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from rest_framework.permissions import IsAuthenticated  
from .permissions import AdvancementTypePermission
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .forms import UploadAdvancementForm
from google.cloud import storage
from django.shortcuts import get_object_or_404
from datetime import datetime




class AvancesViewSet(viewsets.ModelViewSet):
    queryset = Advancements.objects.all()
    serializer_class = AvancesSerializer
    permission_classes = [AdvancementTypePermission]  # Set the permission class here

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


@api_view(['POST'])
def upload_advancement(request, advancement_id):
    advancement = get_object_or_404(Advancements, pk=advancement_id)
    img_avance = request.FILES.get('img_avance')


    if not img_avance:
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    current_date = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')

    img_avance.name = f"{advancement_id}-{current_date}"


    # Initialize a client
    client = storage.Client()
    # Firebase/Google Cloud storage bucket
    bucket = client.bucket('constructiq-f2a29.appspot.com')

    # subdirectory for advancements
    subdirectory = 'avances/images'
    blob = bucket.blob(f"{subdirectory}{img_avance.name}")
    # blob = bucket.blob(img_avance.name)

    blob.upload_from_file(img_avance, content_type=img_avance.content_type)
    advancement.img_avance = blob.public_url  # Store the public URL in model advancement
    advancement.save()

    serializer = ImgAvanceSerializer(advancement)
    return Response(serializer.data, status=status.HTTP_200_OK)


