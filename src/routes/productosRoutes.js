const {Router} = require("express")
const { listarProductos, listarUnProducto, crearProducto, 
eliminarProducto } = require('../controllers/productosControllers')

const router = Router();

//Ruta final complementaria para formar /api/productos/listado
router.get('/listado', listarProductos);
router.get('/listarUno', listarUnProducto);
router.get('/crear', crearProducto);
router.get('/eliminar', eliminarProducto);

module.exports = router;