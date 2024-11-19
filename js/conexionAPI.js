async function listarProductos(){
    const conexion = await fetch("http://localhost:3001/productos");

    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function enviarProductos(nombre,precio,imagen,id){
    const conexion = await fetch("http://localhost:3001/productos",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen,
            id:id
        })
    })
    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el producto");
        }

        const respuestaConvertida = await respuesta.json(); 

        return respuestaConvertida; 
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

export const conexionAPI={
    listarProductos,enviarProductos, eliminarProducto
}