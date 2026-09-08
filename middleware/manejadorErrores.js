const manejoErrores = (err, req, res, next) =>{
    const codigoEstado = err.statusCode || 500
    const mensaje = err.message || "Error inesperado."
    const fecha = new Date().toISOString()
    console.log(['Fecha', fecha - 'Estado:', codigoEstado - 'Mensaje:', mensaje])
 
    //otra parte de mensajes de error
    if(err.stack){
        console.error(err.stack)
    }
    //respuesta del servidor
   res.status(codigoEstado).json({
    Estado: 'error', 
    mensaje: mensaje,
//más detalles cuando somos desarrolladores
...codigoEstado(process.env.NODE_ENV === 'desarrollador' && {stack: err.stack})
})

}

module.exports = manejoErrores