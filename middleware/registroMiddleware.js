const registroMiddlware = (req, res, next) =>{
    const tiempoMilisegundo = Date.now()
    const tiempoUTC = new Date().toISOString
    //console.log(`Milisegundo: ${tiempoMilisegundo}
    //  UTC: ${tiempoUTC}`)
    //Mostrar informacion de la solicitud entrante
    console.log(`[${tiempoUTC}: ${req.method} - ${req.url} - ${req.ip}]`)
    //Escuchamos el evento "finish" para saber cuando termina la rta
    res.on('finish', () => {
        const duracion = Date.now() - tiempoMilisegundo;
        console.log(tiempoUTC, 'respuesta', res.statusCode, duracion + 'ms');
    })
    next()
}

module.exports = registroMiddlware