from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tienda.urls')),  # Asegúrate de que 'tienda' es el nombre correcto de tu aplicación
    path('', include('autenticacion.urls')),  # Agrega esta línea
]


