//import express from "express";//ES
const express = require("express")
const app = express();
const puerto = procses.env.PORT || 3000;

app.get("/",(req,res)=> {
    res.send("Hola ficha 3407180");
});

app.listen(puerto, ()=> {
    console.log(`Servidor funsionando!! en el puerto ${puerto}`);
});