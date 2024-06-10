import logging
from rest_framework import status  
from rest_framework import viewsets
from .serializer import ObraSerializer, ObraPersonalSerializer, ImgObraSerializer
from .models import Obra, ObraPersonal
from rest_framework.permissions import IsAuthenticated  
from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import ObraForm

# Create your views here.

#Añadir decoradores para proteger acceso


class ObraViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

class ObraPersonalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = ObraPersonal.objects.all()
    serializer_class = ObraPersonalSerializer

def obra_image_view(request):

    if request.method == 'POST':
        form = ObraForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = ObraForm()
    return render(request, 'obra_image_form.html', {'form': form})


def success(request):
    return HttpResponse('successfully uploaded')

def display_obra_images(request):

    if request.method == 'GET':

        # getting all the objects of hotel.
        Obras = Obra.objects.all()
        return render(request, 'display_obra_images.html',
                       {'obra_images': Obras})


logger = logging.getLogger(__name__)

@api_view(['POST'])
def upload_image(request, obra_id):
    logger.debug(f"Request data: {request.data}")
    logger.debug(f"Request files: {request.FILES}")

    try:
        obra = Obra.objects.get(id=obra_id)
    except Obra.DoesNotExist:
        return Response({'error': 'Obra not found'}, status=status.HTTP_404_NOT_FOUND)

    if 'img_obra' not in request.FILES:
        logger.debug("No image file provided")
        return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()
    data.update(request.FILES)

    serializer = ImgObraSerializer(obra, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        logger.debug(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

