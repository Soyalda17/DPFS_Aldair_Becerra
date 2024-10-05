const db = require('../../../../database/models'); // Requiere la base de datos de Sequelize

const categoriesApiController = {
    // Listar todas las categorías
    list: async (req, res) => {
        try {
            const categories = await db.Category.findAll({
                attributes: ['id', 'name'], // Solo queremos devolver el id y nombre de la categoría
                include: [{
                    model: db.Product, // Incluimos la relación con productos
                    as: 'products',
                    attributes: ['id'], // Solo contamos los productos, no necesitamos todos los atributos
                }],
            });

            const categoriesWithProductCount = categories.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                    productsCount: category.products.length  // Contamos los productos asociados
                };
            });

            res.json({
                count: categoriesWithProductCount.length,
                categories: categoriesWithProductCount
            });
        } catch (error) {
            console.error("Error en la API de categorías:", error);
            res.status(500).json({ error: "Error al obtener las categorías" });
        }
    },

    // Detalle de una categoría por ID
    detail: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const category = await db.Category.findByPk(categoryId, {
                attributes: ['id', 'name'],
                include: [{
                    model: db.Product,
                    as: 'products',
                    attributes: ['id', 'name', 'description', 'price']  // Atributos que queremos devolver de los productos
                }]
            });

            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            res.json({
                id: category.id,
                name: category.name,
                products: category.products  // Devuelve todos los productos relacionados con la categoría
            });
        } catch (error) {
            console.error("Error al obtener el detalle de la categoría:", error);
            res.status(500).json({ error: 'Error al obtener el detalle de la categoría' });
        }
    }
};

module.exports = categoriesApiController;
