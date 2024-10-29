document.addEventListener('DOMContentLoaded', function () {
  const abrirCarritoBtn = document.getElementById('abrir-carrito');
  const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
  const carritoContenido = document.querySelector('.carrito-contenido');
  const carritoProductos = document.getElementById('carrito-productos');
  const subtotalElem = document.getElementById('subtotal');
  let productosCarrito = [];

  // Función para abrir el carrito
  abrirCarritoBtn.addEventListener('click', function () {
    carritoContenido.classList.add('active');
  });

  // Función para cerrar el carrito
  cerrarCarritoBtn.addEventListener('click', function () {
    carritoContenido.classList.remove('active');
  });

  // Función para agregar productos al carrito
  document.querySelectorAll('.agregar-carrito').forEach(function (button) {
    button.addEventListener('click', function () {
      const productoElem = this.closest('.producto');
      const nombreProducto = productoElem.querySelector('h3').innerText;
      const precioProducto = parseFloat(productoElem.querySelector('.precio').innerText.replace('$', ''));
      const imagenProducto = productoElem.querySelector('img').src;

      const producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto,
      };

      productosCarrito.push(producto);
      actualizarCarrito();
    });
  });

  // Función para actualizar el carrito y mostrar los productos
  function actualizarCarrito() {
    carritoProductos.innerHTML = ''; // Limpiar contenido del carrito
    let subtotal = 0;

    productosCarrito.forEach(function (producto, index) {
      const productoElem = document.createElement('div');
      productoElem.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <span>${producto.nombre}</span>
        <span>$${producto.precio.toFixed(2)}</span>
        <button class="eliminar-producto" data-index="${index}">Eliminar</button>
      `;
      carritoProductos.appendChild(productoElem);

      subtotal += producto.precio;
    });

    subtotalElem.innerText = `Subtotal: $${subtotal.toFixed(2)}`;

    // Añadir evento para eliminar productos
    document.querySelectorAll('.eliminar-producto').forEach(function (button) {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        productosCarrito.splice(index, 1);
        actualizarCarrito();
      });
    });
  }

  // Inicializar Swiper.js para el carrusel
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
    },
  });
});
