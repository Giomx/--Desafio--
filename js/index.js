const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

cargarEventListeners();
function cargarEventListeners() {
     listaProductos.addEventListener('click', agregarProducto);
}

// Funciones
function agregarProducto(e){
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')){
     const productoSeleccionado = e.target.parentElement.parentElement;
     leerDatosProducto(productoSeleccionado);
     }
}
function leerDatosProducto(producto){
     console.log(producto);

     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }
     console.log(infoProducto);
}
