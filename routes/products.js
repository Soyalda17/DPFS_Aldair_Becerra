const express = require('express');
const router = express.Router();


// Ruta para la página de creación de productos
router.get('/create', (req, res) => {
    res.render('products/createProduct');
});

router.post('/create', (req, res) => {
    const { name, price } = req.body;
    console.log('Producto creado:', { name, price });
    res.redirect('/productDetails'); 
});
router.get('/edit/:id', (req, res) => {
    const productId = req.params.id;
    // Aquí buscarías el producto en la base de datos usando `productId`
    const product = {
        id: productId,
        name: 'Nombre del Producto',
        item: 'Código de Producto',
        description: 'Descripción del Producto',
        price: 100,
        quantity: 10,
        discount: 'no'
    };
    res.render('products/editProduct', { product });
});

router.post('/edit/:id', (req, res) => {
    const productId = req.params.id;
    const { name, item, description, price, quantity, discount } = req.body;
    // Aquí actualizarías el producto en la base de datos
    console.log(`Producto ${productId} actualizado:`, { name, item, description, price, quantity, discount });
    res.redirect('/productDetails'); // Redirige a la página de detalles del producto o cualquier otra página adecuada
});


module.exports = router;

