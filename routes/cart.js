const express = require('express');
const router = express.Router();

// Simulación de datos de productos en el carrito
const cartItems = [
    {
        id: 1,
        name: 'Nombre del Producto 1',
        price: 100.00,
        quantity: 1,
        imageUrl: '/images/product1.jpg'
    },
    {
        id: 2,
        name: 'Nombre del Producto 2',
        price: 100.00,
        quantity: 1,
        imageUrl: '/images/product2.jpg'
    }
];

// Ruta para mostrar la página del carrito
router.get('/', (req, res) => {
    // Calcula el subtotal, impuestos y total
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = 3.00;
    const tax = 3.00;
    const serviceCharge = 3.00;
    const total = subtotal + delivery + tax + serviceCharge;

    // Renderiza la vista del carrito
    res.render('products/cart', {
        cartItems: cartItems,
        subtotal: subtotal,
        delivery: delivery,
        tax: tax,
        serviceCharge: serviceCharge,
        total: total
    });
});

module.exports = router;
