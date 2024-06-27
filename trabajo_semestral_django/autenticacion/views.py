from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import RegistroForm, LoginForm

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Registrado con éxito')
            return redirect('login')
    else:
        form = RegistroForm()
    return render(request, 'autenticacion/singin.html', {'form': form})

def iniciar_sesion(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Inicio de sesión exitoso')
            return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'autenticacion/login.html', {'form': form})

def cerrar_sesion(request):
    logout(request)
    messages.success(request, 'Sesión cerrada exitosamente')
    return redirect('login')
