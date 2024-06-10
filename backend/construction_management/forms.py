# forms.py
from django import forms
from .models import Obra 
from main_module.settings import FIREBASE_BUCKET

class ObraForm(forms.ModelForm):

    class Meta:
        model = Obra
        fields = '__all__'


class UploadObraForm(forms.ModelForm):
    class Meta:
        model = Obra
        fields = ('img_obra',)

    def save(self, commit=True):
        instance = super().save(commit=False)
        img_obra = self.cleaned_data['img_obra']


        blob = FIREBASE_BUCKET.blob(img_obra.name)
        blob.upload_from_file(img_obra.file, content_type=img_obra.content_type)

        # Set the img_obra URL in the model instance
        instance.img_obra = blob.public_url

        if commit:
            instance.save()
        return instance

