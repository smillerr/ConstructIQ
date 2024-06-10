from django.urls import path,include
from rest_framework import routers
from construction_management import views
from django.conf import settings
from django.conf.urls.static import static
from .views import obra_image_view, success

router=routers.DefaultRouter()
router.register(r'obras', views.ObraViewSet)
router.register(r'obras-personal', views.ObraPersonalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('obra_upload', views.obra_image_view, name='obra_upload'),
    path('success', success, name='success'),
    path('obra_images', views.display_obra_images, name = 'obra_images'),
]

if settings.DEBUG:
        urlpatterns += static(settings.STATIC_URL,
                              document_root=settings.STATIC_ROOT)
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)
