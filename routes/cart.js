const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Ejemplo de datos de productos en el carrito (normalmente vendrían de una base de datos o sesión)
  const cartItems = [
    { name: 'Producto 1', price: 100, quantity: 1 },
    { name: 'Producto 2', price: 100, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 3.00;
  const tax = 3.00;
  const serviceCharge = 3.00;
  const total = subtotal + delivery + tax + serviceCharge;

  res.render('cart', { cartItems, subtotal, delivery, tax, serviceCharge, total });
});

module.exports = router;
