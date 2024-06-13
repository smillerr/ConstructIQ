from django.urls import path,include
from rest_framework import routers
from construction_management import views
from django.conf import settings
from django.conf.urls.static import static
from .views import upload_obra
import environ
import threading

router=routers.DefaultRouter()
router.register(r'obras', views.ObraViewSet)
router.register(r'obras-personal', views.ObraPersonalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #path('firabase', views.upload_obra, name='upload'),
    path('upload-obra/<int:obra_id>/', views.upload_obra, name='upload-obra')
]

if settings.DEBUG:
        urlpatterns += static(settings.STATIC_URL,
                              document_root=settings.STATIC_ROOT)
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)

