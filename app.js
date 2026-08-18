const express = require("express")

const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req,res) => {
    res.send(`<h1>Api Aprendices</h1`)
})
 
//listo para crear enpoint
//enpoint para listar aprendices
app.get("/api/aprendices", (req,res) => {
    res.json({ mensaje: "enpoint para listar aprendices"})
})

app.listen(PORT, ()=> {
    console.log(`Servidor http://localhost:${PORT}
        http://127.0.0.1:${PORT}`);
});

