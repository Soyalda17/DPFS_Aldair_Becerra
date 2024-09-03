// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Mostrar la vista del carrito
router.get('/', cartController.showCart);

// Agregar un producto al carrito
router.post('/add', cartController.addToCart);

// Actualizar la cantidad de un producto en el carrito
router.post('/update', cartController.updateCart);

// Eliminar un producto del carrito
router.post('/remove', cartController.removeFromCart);

// Finalizar la compra
router.post('/checkout', cartController.checkout);

module.exports = router;
