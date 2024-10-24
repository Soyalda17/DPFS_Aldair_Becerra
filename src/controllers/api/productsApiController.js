const db = require('../../database/models');

const productsApiController = {
    list: async (req, res) => {
        try {
          const products = await db.Product.findAll();  
          console.log("Productos devueltos:");
          res.json({
            count: products.length,
            products: products,  
          });
        } catch (error) {
          res.status(500).json({ error: "Error fetching products" });
        }
      },
    detail: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await db.Product.findByPk(productId, {
                attributes: ['id', 'name', 'description', 'price', 'image'],
                include: [{ model: db.Category, as: 'category', attributes: ['name'] }]
            });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: `/uploads/products/${product.image}`,
                category: product.category ? product.category.name : null
            });
        } catch (error) {
            console.error("Error en la API de productos:", error);
            return res.status(500).json({ error: 'Error al obtener el detalle del producto' });
        }
    }
};


module.exports = productsApiController;
