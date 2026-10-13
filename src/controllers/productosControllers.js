//const {listarProductos} = require()















const {listar} = require("../models/productosModel")

const listarProductos = async (req, res)=>{
   try {
//obtener listado de productos, utilizando el servicio
       const productos = await listar()
       res.status(200).json(productos)
   }catch (error) {
    res.status(500).json({Error: error.message})
   }
}
const listarUnProducto = (req, res)=>{
    res.json({mensaje: "Ruta de listar un producto"})
}

const crearProducto = (req, res)=>{
    res.json({mensaje: "Ruta de crear de un producto"})
}

const eliminarProducto = (req, res)=>{
    res.json({mensaje: "Ruta de eliminar un producto"})
}

module.exports = {listarProductos, listarUnProducto, crearProducto, 
eliminarProducto}

