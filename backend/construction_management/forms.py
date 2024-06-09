# forms.py
from django import forms
from .models import Obra 


class ObraForm(forms.ModelForm):

    class Meta:
        model = Obra
        fields = '__all__'
