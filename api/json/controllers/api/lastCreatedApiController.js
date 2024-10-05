const db = require('../../../../database/models');

const lastCreatedApiController = {
    lastCreated: async (req, res) => {
        try {
            console.log("Iniciando la búsqueda del último producto");

            const lastProduct = await db.Product.findOne({
                order: [['created_at', 'DESC']],
                attributes: ['id', 'name', 'description', 'price', 'created_at']
            });
            console.log("Último producto encontrado:", lastProduct);

            if (lastProduct) {
                return res.json({ type: 'product', data: lastProduct });
            } else {
                console.log("No se encontró ningún producto");
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error("Error al obtener el último producto:", error);
            res.status(500).json({ error: "Error al obtener el último producto" });
        }
    }
};

module.exports = lastCreatedApiController;
