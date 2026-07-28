import express from "express";//ES
//import {configDotenv} from "dotenv"
//configDotenv()
import "dotenv/config"
//const express = require("express");
const app = express();
const puerto = process.env.PORT || 3500;

app.get("/",(req,res)=> {
    res.send("Hola ficha 3407180 del SENA");
});

app.get("/MiSaludo",(req,res)=> {
    res.send(`<h1>Hola soy Camila de la ficha 3407180<h1/>
        <p>del SENA</p>`);
});

app.get("/MiSaludo/:id",(req,res)=> {
    const id= req.params.id;
    res.send(`<h1>Saludo<h1/>
        <p>Hola soy Camila de la ficha con ID ${id}</p>`);
});

//Productos-categoria
app.get("/productos/:categoria",(req,res)=> {
    const categoria= req.params.categoria;
    res.send(`<h1>Productos</h1>
         <p>Categoría: ${categoria}</p>`);
});

//Productos-categoría(id)
app.get("/productos/:categoria/:id",(req,res)=> {
    const categoria= req.params.categoria;
    const id= req.params.id;
    res.send(`<h1>Producto</h1><p>Categoría: ${categoria}</p><p>ID: ${id}</p>`);
});

app.listen(puerto, ()=> {
    console.log(`Servidor http://localhost:${puerto}
        http://127.0.0.1:${puerto}`);
});

