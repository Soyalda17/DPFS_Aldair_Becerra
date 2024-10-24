const express = require('express');
const router = express.Router();
const { Product, Category, Subcategory } = require('../database/models');

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Buscando el producto en la base de datos usando Sequelize
        const product = await Product.findOne({
            where: { id: productId },
            include: [
                {
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: Subcategory,
                    attributes: ['name']
                }
            ]
        });

        // Si el producto no se encuentra, envía un error 404
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Renderizando la vista con los detalles del producto obtenidos de la base de datos
        res.render('products/productDetails', {
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                categorie: product.Category ? product.Category.name : 'Sin categoría',
                subcategory: product.Subcategory ? product.Subcategory.name : 'Sin subcategoría',
                image: product.image 
            }
        });

    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
