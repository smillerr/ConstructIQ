from django import forms
from .models import Advancements
from main_module.settings import FIREBASE_BUCKET

class AdvancementForm(forms.ModelForm):

    class Meta:
        model = Advancements
        fields = '__all__'


class UploadAdvancementForm(forms.ModelForm):
    class Meta:
        model = Advancements
        fields = ('img_avance',)

    def save(self, commit=True):
        instance = super().save(commit=False)
        img_avance = self.cleaned_data['img_avance']


        blob = FIREBASE_BUCKET.blob(img_avance.name)
        blob.upload_from_file(img_avance.file, content_type=img_avance.content_type)

        # Set the img_avance URL in the model instance
        instance.img_avance = blob.public_url

        if commit:
            instance.save()
        return instance

