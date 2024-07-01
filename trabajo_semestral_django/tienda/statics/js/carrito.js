document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.agregar');
    const carrito = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    let total = 0;
    let productosEnCarrito = {};
  
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
          
          const li = document.createElement('li');
          li.innerText = `${nombreProducto} - $${precioProducto.toFixed(2)}`;
          li.setAttribute('data-producto-id', productoId);
          const botonEliminar = document.createElement('button');
          botonEliminar.innerText = 'Eliminar';
          li.appendChild(botonEliminar);
          carrito.appendChild(li);
          
          total += precioProducto;
          totalElement.innerText = `Total: $${total.toFixed(2)}`;
  
          botonEliminar.addEventListener('click', () => {
            carrito.removeChild(li);
            total -= precioProducto;
            totalElement.innerText = `Total: $${total.toFixed(2)}`;
            productosEnCarrito[productoId].cantidad -= 1;
          });
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
    });
  });
  