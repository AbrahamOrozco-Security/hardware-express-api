const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/', productosController.listar);
router.post('/', productosController.crear);
router.put('/:id', productosController.actualizar); // Endpoint solicitado por la rúbrica
router.delete('/:id', productosController.eliminar);

module.exports = router;