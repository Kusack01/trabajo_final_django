document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.agregar');
  const carrito = document.getElementById('carrito');
  const totalElement = document.getElementById('total');
  const botonVaciarCarrito = document.getElementById('vaciar-carrito');
  const botonPagar = document.getElementById('pagar');
  let total = 0;
  let usuarioActual = obtenerUsuarioActual();
  let productosEnCarrito = obtenerProductosEnCarrito(usuarioActual);

  function obtenerUsuarioActual() {
    // Implementa la lógica para obtener el usuario actual
    // Puede ser a través de cookies, tokens de sesión, etc.
    // Aquí te muestro un ejemplo básico con cookies:
    const usuario = getCookie('usuario'); // Asumiendo que 'usuario' es un identificador único del usuario
    return usuario;
  }

  function obtenerProductosEnCarrito(usuario) {
    const key = `productosEnCarrito_${usuario}`;
    return JSON.parse(localStorage.getItem(key)) || {};
  }
  

  function actualizarCarrito() {
    const key = `productosEnCarrito_${usuarioActual}`;
    carrito.innerHTML = '';
    total = 0;
    for (const productoId in productosEnCarrito) {
      const producto = productosEnCarrito[productoId];
      const li = document.createElement('li');
      li.innerText = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      li.setAttribute('data-producto-id', productoId);
      const botonEliminar = document.createElement('button');
      botonEliminar.innerText = 'Eliminar';
      li.appendChild(botonEliminar);
      carrito.appendChild(li);

      total += producto.precio * producto.cantidad;

      botonEliminar.addEventListener('click', () => {
        total -= producto.precio * producto.cantidad;
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
        producto.cantidad -= 1;
        if (producto.cantidad === 0) {
          delete productosEnCarrito[productoId];
        }
        localStorage.setItem(key, JSON.stringify(productosEnCarrito));
        actualizarCarrito();
      });
    }
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  function guardarProductosEnCarrito(usuario, productosEnCarrito) {
    const key = `productosEnCarrito_${usuario}`;
    localStorage.setItem(key, JSON.stringify(productosEnCarrito));
  }

  actualizarCarrito();

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const productoId = boton.getAttribute('data-producto-id');
      const stock = parseInt(boton.getAttribute('data-stock'), 10);
      const nombreProducto = boton.closest('.info-product').querySelector('h2').innerText;
      const precioProducto = parseFloat(boton.closest('.info-product').querySelector('.price').innerText.replace('$', ''));

      if (!productosEnCarrito[productoId]) {
        productosEnCarrito[productoId] = { cantidad: 0, nombre: nombreProducto, precio: precioProducto };
      }

      if (productosEnCarrito[productoId].cantidad < stock) {
        productosEnCarrito[productoId].cantidad += 1;
        actualizarCarrito();
        guardarProductosEnCarrito(usuarioActual, productosEnCarrito);
      } else {
        alert('No hay suficiente stock disponible para agregar más de este producto.');
      }
    });
  });

  botonVaciarCarrito.addEventListener('click', () => {
    carrito.innerHTML = '';
    total = 0;
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
    productosEnCarrito = {};
    guardarProductosEnCarrito(usuarioActual, productosEnCarrito);
  });

  botonPagar.addEventListener('click', async () => {
    if (Object.keys(productosEnCarrito).length === 0) {
      alert('Debe agregar productos al carrito antes de proceder al pago.');
      return;
    }

    try {
      const response = await fetch('/pagar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ productos: productosEnCarrito })
      });

      if (response.ok) {
        carrito.innerHTML = '';
        total = 0;
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
        productosEnCarrito = {};
        localStorage.removeItem(`productosEnCarrito_${usuarioActual}`);
        alert('Gracias por su compra');
        window.location.reload();
      } else {
        alert('Hubo un problema con su compra, por favor intente de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con su compra, por favor intente de nuevo.');
    }
  });
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
