from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Página de inicio
    path('acerca/', views.acerca, name='acerca'),
    path('admin/', views.admin, name='admin'),
    path('ayuda/', views.ayuda, name='ayuda'),
    path('carrocompra/', views.carrocompra, name='carrocompra'),
    path('centrodeayuda/', views.centrodeayuda, name='centrodeayuda'),
    path('cerrar/', views.cerrar, name='cerrar'),
    path('convensocio/', views.convensocio, name='convensocio'),
    path('devoluciones/', views.devoluciones, name='devoluciones'),
    path('favoritos/', views.favoritos, name='favoritos'),
    path('ingresar/', views.ingresar, name='ingresar'),
    path('inversiones/', views.inversiones, name='inversiones'),
    path('lanzamientos/', views.lanzamientos, name='noticias'),
    path('noticias/', views.noticias, name='noticias'),
    path('ofertas/', views.ofertas, name='ofertas'),
    path('perfil/', views.perfil, name='perfil'),
    path('registro/', views.registro, name='registro'),
    path('sustentabilidad/', views.sustentabilidad, name='sustentabilidad'),
    path('termnsycond/', views.termnsycond, name='termnsycond'),
    path('trabconnos/', views.trabconnos, name='trabconnos'),
]
