const express = require("express")
const app = express()
require("dotenv/config")
app.set("json spaces", 2)
//configuracion de body-parse
app.use(express.json())
const sistemaArchivos = require("fs")
const ruta = require("path")
const PORT = process.env.PORT || 3500;
//importar jsonwebtoken
const jswtoken = require("jsonwebtoken")
//importando mi middleware
const registroMiddleware = require ("./middleware/registroMiddleware")
const manejoErrores = require("./middleware/registroMiddleware")
const autenticacion = require("./middleware/autenticacion")
//mis middleware
app.use(express.json())
app.use(express.urlencoded)
app.use(autenticacion)
    //ruta de mi archivo json
const rutaArchivoJson = ruta.join(__dirname, "aprendices.json")

app.get("/", (req,res) => {
    res.send(`<h1>Api Aprendices</h1>`)
})
  
//enpoint para listar aprendices
app.get("/api/aprendices", (req, res) => {
    sistemaArchivos.readFile(rutaArchivoJson, "utf-8", (error, datos) =>
    {
        if (error){
            return res.status(500).json({ Error: "Error conexión db."})
        }
        const listaAprendices = JSON.parse(datos)
        res.json(listaAprendices)
    })
    
})

//enpoint para adicionar aprendices
app.post("/api/aprendices", (req, res) => {
    //capturar los datos enviados
    const datosAprendiz = req.body
    sistemaArchivos.readFile(rutaArchivoJson, "utf-8", (error, datos) =>
    {
        if (error){
            return res.status(500).json({ Error: "Error conexión db."})
        }
        const listaAprendices = JSON.parse(datos)
        //agregar a la lista de javascript
        listaAprendices.push(datosAprendiz)
            //escritura de archivo
        sistemaArchivos.writeFile(rutaArchivoJson, JSON.stringify
        (listaAprendices, null, 2), (error) => {
            if (error) {
                return res.json({Error: "No se puede registrar."})
            }
        res.status(200).json(datosAprendiz)
        })
    })
})

//endpoint para modificar aprendices
app.put("/api/aprendices/:id", (req, res) => {
    const diAprendiz = parseInt(req.params.di, 10)
    const datosAprendiz = req.body
    sistemaArchivos.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error de conexión bd."})
        }
        let listaAprendices = JSON.parse(datos)
        //actualizar aprendiz
        listaAprendices = listaAprendices.map(aprendiz => { 
            return aprendiz.di === diAprendiz ? {...aprendiz, ...datosAprendiz } :
            aprendiz
        })
        //escritura de archivo
        sistemaArchivos.writeFile(rutaArchivoJson, JSON.stringify
        (listaAprendices, null, 2), (error) => {
            if (error) {
                return res.json({Error: "No se puede editar."})
            }
        res.status(200).json(datosAprendiz)
        })
    })
    
})

//enpoint para eliminar aprendices
app.delete("/api/aprendices/:id", (req, res) => {
    res.status(200).json({ mensaje: "aprendiz eliminado" })
})


//enpoint para probocar un error
app.get("/error", (req, res, next) => {
    next(new Error("Error provocado, intencional"))
})

//Middleware
//app.use((req,res, next)=>{
  //  console.log(`Tiempo en milisegundos: ${Date.now()}`)
    //next()
// })

   app.get("/rutaprotegida", autenticacion, (req, res) => {
     res.json({ mensaje: "Acceso concedido" })
   })

   //endpoint inicio de sesion
app.post("/login", (req, res)=>{
    //capturar datos del usuario
    const {usuario, clave} = req.body//simular datos del usuario de una bd
    const datoUsuario = {"usuarioBd": "camila", "clave":"abc123"}
    //validar datos de usuario
    if (usuario !== datoUsuario.usuarioBd || clave == datoUsuario.clave){
        res.status(400).json({mensaje: "Credenciales incorrectas"})
    }
    //generar y verificar 
    const token = jswtoken.sign(
        {usuario: usuario},
        process.env.JWT_SECRETO,
        {expiresIn: "1h"}
    )
    res.json(token)
})


// Modo de escucha del servidor
app.listen(PORT, ()=> {
    console.log(`Servidor http://localhost:${PORT}
        http://127.0.0.1:${PORT}`)
})


