
# forms.py
from django import forms
from .models import Usuario
from main_module.settings import FIREBASE_BUCKET

class UploadUsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ('foto_perfil',)

    def save(self, commit=True):
        instance = super().save(commit=False)
        foto_perfil = self.cleaned_data['foto_perfil']


        blob = FIREBASE_BUCKET.blob(foto_perfil.name)
        blob.upload_from_file(foto_perfil.file, content_type=foto_perfil.content_type)

        # Set the foto_perfil URL in the model instance
        instance.foto_perfil = blob.public_url

        if commit:
            instance.save()
        return instance

