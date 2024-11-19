import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")

export default function crearCard(nombre,precio,imagen,id){
    const producto = document.createElement("div");
    producto.className = "card";
    producto.innerHTML = `<img class="productos__imagen" src="${imagen}" />
                    <div class="card-container--info">
                      <p>${nombre}</p>
                      <div class="card-container--value">
                        <p>$ ${precio}</p>
                        <img src="./assets/trash_icon.png" data-delete="${id}"/>
                      </div>
                    </div>`

    return producto;
}

async function listarProductos(){
    try{
        const listaAPI = await conexionAPI.listarProductos()

        listaAPI.forEach(producto=>lista.appendChild(crearCard(producto.nombre,producto.precio,producto.imagen, producto.id)))

         const botonesEliminar = lista.querySelectorAll("[data-delete]");
         botonesEliminar.forEach(boton => {
             boton.addEventListener("click", eliminarProducto);
         });

    }catch{
        lista.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexion :( </h2>`;
    }
    
}

async function eliminarProducto(evento) {
  const idProducto = evento.target.getAttribute("data-delete");

  if (!idProducto) return;

  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (!confirmacion) {
      return;
  }

  try {

      await conexionAPI.eliminarProducto(idProducto);

      const productoEliminado = evento.target.closest(".card");
      lista.removeChild(productoEliminado);
      alert("Se ha eliminado el producto.");
  } catch (error) {
      console.error("Error al eliminar el producto:", error);
  }
}


listarProductos()