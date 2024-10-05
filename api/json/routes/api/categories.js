const express = require('express');
const router = express.Router();
const categoriesApiController = require('../../controllers/api/categoriesApiController');

// Ruta para listar todas las categorías
router.get('/', categoriesApiController.list);

// Ruta para obtener el detalle de una categoría por su ID
router.get('/:id', categoriesApiController.detail);

module.exports = router;
