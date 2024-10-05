const db = require('../../../../database/models');

const usersApiController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();
            res.json({
                count: users.length,
                users: users.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                }))
            });
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    },
    
    detail: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await db.User.findByPk(userId, {
                attributes: ['id', 'name', 'email', 'image']
            });
            
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                image: `/uploads/users/${user.image}`
            });
        } catch (error) {
            console.error("Error al obtener el detalle del usuario:", error);
            res.status(500).json({ error: "Error al obtener el detalle del usuario" });
        }
    }
};

module.exports = usersApiController;
