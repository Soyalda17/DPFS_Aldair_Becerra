const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController');

// Ruta para listar productos con paginado
router.get('/', productsApiController.list);

// Ruta para obtener el detalle de un producto
router.get('/:id', productsApiController.detail);

module.exports = router;
