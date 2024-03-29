const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito =[];

cargarEventListeners();

function cargarEventListeners() {
     listaProductos.addEventListener('click', agregarProducto);

     carrito.addEventListener('click', eliminarProducto);

     //Mostrar storage
     document.addEventListener('DOMContentLoaded', () =>{
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

          carritoHTML();
     })
}

// Funciones
function agregarProducto(e){
     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito')){
     const productoSeleccionado = e.target.parentElement.parentElement;
     leerDatosProducto(productoSeleccionado);
     }
     
//Agregando libreria
     Toastify({
          text: "Producto agregado",
          duration: 3000
      }).showToast();
}

function eliminarProducto(e){
     console.log(e.target.classList);
     if(e.target.classList.contains('borrar-producto')){
          const productoId = e.target.getAttribute('data-id');

          //Eliminar articulosCarrito por data-id
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

          carritoHTML();//Iterar sobre el carrito y mostrar el HTMl
     }
}


function leerDatosProducto(producto){
     // console.log(producto);

     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }  
     const existencia = articulosCarrito.some(producto => producto.id === infoProducto.id);
     if(existencia){
          //Actualizar Cantidad
          const productos = articulosCarrito.map(producto => {
               if(producto.id ===infoProducto.id){
                    producto.cantidad++;
                    return producto; //Retornar articulos actualizados
               } else {
                    return producto; //Retornar articulos no duplicados
               }
          });
          articulosCarrito = [...productos];
     } else {
          //Agregando elementos
          articulosCarrito = [...articulosCarrito, infoProducto];
     }

     console.log(articulosCarrito);

     carritoHTML();
}

function carritoHTML(){

     //Remover articulos
     limpiarHTML();

     articulosCarrito.forEach(producto => {
          const {imagen, titulo, precio, cantidad, id} = producto;
          const row = document.createElement('tr');
          row.innerHTML = `
               <td><img src = "${imagen}" width ="50"></td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad}</td>
               <td><a href = "#" class="borrar-producto" data-id="${id}">X</</a></td>
          `;

          contenedorCarrito.appendChild(row);

     });
     //Agregado el Storage
     syncStorage();
}

function syncStorage(){
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Eliminar del tbody
function limpiarHTML(){
     while(contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     }
}
