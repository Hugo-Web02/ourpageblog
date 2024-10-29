let carrito = [];
let totalCarrito = 0;

function agregarAlCarrito(producto) {
  const productoExistente = carrito.find(item => item.nombre === producto.nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push(producto);
  }
  totalCarrito += producto.precio;
  actualizarContadorCarrito();
  actualizarCarrito(); // Actualiza la visualización del carrito
}

function actualizarContadorCarrito() {
  const contador = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById('abrir-carrito').textContent = `Carrito (${contador})`;
}

function eliminarDelCarrito(index) {
  const producto = carrito[index];
  totalCarrito -= producto.precio * producto.cantidad;
  carrito.splice(index, 1);
  actualizarContadorCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoBody = document.getElementById('carrito-productos');
  carritoBody.innerHTML = ''; // Limpiar el contenido anterior

  if (carrito.length === 0) {
    carritoBody.innerHTML = '<p>El carrito está vacío</p>';
    document.getElementById('subtotal').innerText = 'Subtotal: $0.00';
  } else {
    carrito.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('carrito-producto'); // Añadir clase para facilitar el estilo
      row.innerHTML = `
        <p>${item.nombre} (Cantidad: ${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      carritoBody.appendChild(row);
    });
    document.getElementById('subtotal').innerText = `Subtotal: $${totalCarrito.toFixed(2)}`;

    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
      boton.addEventListener('click', () => {
        const index = boton.getAttribute('data-index');
        eliminarDelCarrito(index);
      });
    });
  }
}

document.getElementById('abrir-carrito').addEventListener('click', () => {
  document.getElementById('carrito-contenido').classList.add('active');
});

document.getElementById('cerrar-carrito').addEventListener('click', () => {
  document.getElementById('carrito-contenido').classList.remove('active');
});

// Agregar evento a los botones de agregar al carrito
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
botonesAgregarCarrito.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombreProducto = boton.getAttribute('data-nombre');
    const precioProducto = parseFloat(boton.getAttribute('data-precio'));
    agregarAlCarrito({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
  });
});

/* -------------------------------------------------------------
   Iniciador carrusel & botones
------------------------------------------------------------- */

// Inicializar Swiper.js para el carrusel
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 4000, // Tiempo en milisegundos entre cada diapositiva (4 segundos)
    disableOnInteraction: false, // Sigue la reproducción automática incluso después de interacción manual
  },
  loop: true, // Hace que el carrusel se repita al llegar al final
});
