const db = require('../database/models');

module.exports = async (req, res, next) => {
    try {
        // Si la sesión está activa y el usuario está autenticado
        if (req.session && req.session.userLogged) {
            return next();
        }
        
        // Si no hay sesión, pero hay una cookie válida
        if (req.cookies && req.cookies.userId) {
            let user = await db.User.findByPk(req.cookies.userId);
            
            if (user) {
                // Restaurar la sesión con la información del usuario
                req.session.userLogged = user;
                req.session.user = {
                    id: user.id,
                    email: user.email,
                };
                return next();
            }
        }
    } catch (error) {
        // Manejar errores de autenticación
        console.error("Error al autenticar al usuario:", error);
        return res.status(500).send('Error interno de autenticación');
    }

    // Si no hay sesión ni cookie válida, redirigir a login
    return res.redirect('/users/login');
};
