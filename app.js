const express = require("express")
const app = express()
app.set("json spaces", 2)
//configuracion de body-parse
app.use(express.json())
const sistemaArchivos = require("fs")
const ruta = require("path")
const PORT = process.env.PORT || 3500;
    //ruta de mi archivo json
const rutaArchivoJson = ruta.join(__dirname, "aprendices.json")

app.get("/", (req,res) => {
    res.send(`<h1>Api Aprendices</h1`)
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
        res.status(201).json(datosAprendiz)
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
    res.json({ mensaje: "aprendiz eliminado" })
})

app.listen(PORT, ()=> {
    console.log(`Servidor http://localhost:${PORT}
        http://127.0.0.1:${PORT}`);
});

