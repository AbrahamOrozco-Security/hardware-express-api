const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/', productosController.listar);
router.post('/', productosController.crear);
router.delete('/:id', productosController.eliminar);

module.exports = router;