document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.agregar');
  const carrito = document.getElementById('carrito');
  const totalElement = document.getElementById('total');
  const botonVaciarCarrito = document.getElementById('vaciar-carrito');
  const botonPagar = document.getElementById('pagar');
  let total = 0;
  let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || {};

  function actualizarCarrito() {
    carrito.innerHTML = '';
    total = 0;
    for (const productoId in productosEnCarrito) {
      const producto = productosEnCarrito[productoId];
      for (let i = 0; i < producto.cantidad; i++) {
        const li = document.createElement('li');
        li.innerText = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        li.setAttribute('data-producto-id', productoId);
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'Eliminar';
        li.appendChild(botonEliminar);
        carrito.appendChild(li);

        total += producto.precio;

        botonEliminar.addEventListener('click', () => {
          carrito.removeChild(li);
          total -= producto.precio;
          totalElement.innerText = `Total: $${total.toFixed(2)}`;
          productosEnCarrito[productoId].cantidad -= 1;
          if (productosEnCarrito[productoId].cantidad === 0) {
            delete productosEnCarrito[productoId];
          }
          localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
        });
      }
    }
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  actualizarCarrito();

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const productoId = boton.getAttribute('data-producto-id');
      const stock = parseInt(boton.getAttribute('data-stock'), 10);
      const nombreProducto = boton.closest('.info-product').querySelector('h2').innerText;
      const precioProducto = parseFloat(boton.closest('.info-product').querySelector('.price').innerText.replace('$', ''));

      if (!productosEnCarrito[productoId]) {
        productosEnCarrito[productoId] = { cantidad: 0, nombre: nombreProducto, precio: precioProducto, stock: stock };
      }

      if (productosEnCarrito[productoId].cantidad < stock) {
        productosEnCarrito[productoId].cantidad += 1;
        actualizarCarrito();
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
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
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
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
        localStorage.removeItem('productosEnCarrito');
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
