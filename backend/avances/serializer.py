from rest_framework import serializers
from urllib.request import urlopen
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from io import BytesIO
from .models import Advancements
from PIL import Image
from PIL.ExifTags import TAGS
import logging
from django.core.files.temp import NamedTemporaryFile
    
logger = logging.getLogger(__name__)


class AvancesSerializer(serializers.ModelSerializer):
    img_avance = serializers.URLField(read_only=True)
    georeferencia= serializers.JSONField()
    class Meta:
        model = Advancements
        fields = '__all__'

    
    def validate_georeferencia(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("georeferencia debe contener 'latitud' y 'longitud'.")
        
        if 'latitud' not in value or 'longitud' not in value:
            raise serializers.ValidationError("georeferencia debe contener 'latitud' y 'longitud'.")
        
        if not isinstance(value['latitud'], (float, int)) or not isinstance(value['longitud'], (float, int)):
            raise serializers.ValidationError("'latitud' y 'longitud' deben ser números.")

        return value

class ImgAvanceSerializer(serializers.ModelSerializer):
    img_avance = serializers.URLField(read_only=True)
    exif_metadata = serializers.DictField(read_only=True)

    class Meta:
        model = Advancements
        fields = ['img_avance', 'exif_metadata']
    

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        image_data = instance.img_avance  # Assuming img_avance stores the image URL
        if image_data:
            exif_metadata = self.extract_exif_metadata(image_data)
            representation['exif_metadata'] = exif_metadata
        return representation

    def extract_exif_metadata(self, image_data):
        exif_data = {}
        try:
            image = Image.open(BytesIO(image_data.read()))
            exif_data = image._getexif()
            if exif_data:
                exif_data = {TAGS.get(tag): value for tag, value in exif_data.items()}
        except (IOError, AttributeError, KeyError, IndexError) as e:
            logger.error(f"Error extracting EXIF metadata: {e}")
        logger.debug(f"EXIF metadata extracted: {exif_data}")
        return exif_data
