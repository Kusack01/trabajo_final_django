from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Producto

def index(request):
    context = {}
    return render(request, 'tienda/index.html', context)

def acerca(request):
    context = {}
    return render(request, 'tienda/acerca.html', context)

def administracion(request):
    context = {}
    return render(request, 'tienda/administracion.html', context)

def ayuda(request):
    context = {}
    return render(request, 'tienda/ayuda.html', context)

def carrocompra(request):
    context = {}
    return render(request, 'tienda/carrocompra.html', context)

def centrodeayuda(request):
    context = {}
    return render(request, 'tienda/centrodeayuda.html', context)

def cerrar(request):
    context = {}
    return render(request, 'tienda/cerrar.html', context)

def convensocio(request):
    context = {}
    return render(request, 'tienda/convensocio.html', context)

def devoluciones(request):
    context = {}
    return render(request, 'tienda/devoluciones.html', context)

def favoritos(request):
    context = {}
    return render(request, 'tienda/favoritos.html', context)

def ingresar(request):
    context = {}
    return render(request, 'tienda/ingresar.html', context)

def inversiones(request):
    context = {}
    return render(request, 'tienda/inversiones.html', context)

def lanzamientos(request):
    context = {}
    return render(request, 'tienda/lanzamientos.html', context)

def noticias(request):
    context = {}
    return render(request, 'tienda/noticias.html', context)

def ofertas(request):
    context = {}
    return render(request, 'tienda/ofertas.html', context)

@login_required
def perfil(request):
    context = {
        'user': request.user  # Pasa el usuario autenticado al contexto
    }
    return render(request, 'tienda/perfil.html', context)

def registro(request):
    context = {}
    return render(request, 'tienda/registro.html', context)

def sustentabilidad(request):
    context = {}
    return render(request, 'tienda/sustentabilidad.html', context)

def termnsycond(request):
    context = {}
    return render(request, 'tienda/termnsycond.html', context)

def trabconnos(request):
    context = {}
    return render(request, 'tienda/trabconnos.html', context)

def index(request):
    productos = Producto.objects.all()
    return render(request, 'tienda/index.html', {'productos': productos})

def plantilla(request):
    context = {}
    return render(request, 'tienda/plantilla.html', context)

def probado(request):
    context = {}
    return render(request, 'tienda/probado.html', context)
