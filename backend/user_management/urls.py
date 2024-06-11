from django.urls import path,include
from rest_framework import routers
from user_management import views
from django.conf import settings
from django.conf.urls.static import static
from .views import upload_usuario
import environ
import threading

router=routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload-usuario/<int:usuario_id>/', views.upload_usuario, name='upload-usuario')
]

if settings.DEBUG:
        urlpatterns += static(settings.STATIC_URL,
                              document_root=settings.STATIC_ROOT)
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)


