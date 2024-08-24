const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    // Supongamos que estás recibiendo un ID de producto
    const productId = req.params.id;

    // Lógica para obtener los detalles del producto usando el productId

    res.render('productDetails', {
        product: {
            id: productId,
            name: 'Nombre del Producto',
            price: 100,
            description: 'Descripción del producto',
            // Otros detalles del producto
        }
    });
});

module.exports = router;
