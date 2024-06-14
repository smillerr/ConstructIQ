from rest_framework import routers
from task_advancements import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
import environ
import threading
 

router=routers.DefaultRouter()
router.register(r'avances', views.AvancesViewSet)

urlpatterns = [
    path('', include(router.urls))
]

if settings.DEBUG:
        urlpatterns += static(settings.STATIC_URL,
                              document_root=settings.STATIC_ROOT)
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)


