const express = require('express');
const router = express.Router();
const cartApiController = require('../../controllers/api/cartApiController');

// Ruta para obtener el carrito
router.get('/', cartApiController.getCart);

// Ruta para agregar un producto al carrito
router.post('/add', cartApiController.addToCart);

// Ruta para actualizar la cantidad de un producto en el carrito
router.post('/update', cartApiController.updateCart);

// Ruta para eliminar un producto del carrito
router.post('/remove', cartApiController.removeFromCart);

module.exports = router;
