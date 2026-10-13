const {Router} = require('express');
const usuariosRoutes = require('./usuariosRoutes.js');
const productosRoutes = require('./productosRoutes.js');
const authRoutes = require('./authRoutes.js'); // <--- Importar rutas

const router = Router();

router.use('/listar', usuariosRoutes);
router.use('/listar', productosRoutes);
router.use('/auth', authRoutes); // Quedará accesible en /api/auth/reg

module.exports = router;