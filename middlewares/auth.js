const db = require('../database/models');

module.exports = async (req, res, next) => {
    if (req.session && req.session.userLogged) {
        return next();
    } else if (req.cookies && req.cookies.userId) {
        try {
            let user = await db.User.findByPk(req.cookies.userId);
            if (user) {
                req.session.userLogged = user;
                req.session.user = {
                    id: user.id,
                    email: user.email,
                };
                return next();
            }
        } catch (error) {
            console.error("Error al autenticar al usuario:", error);
        }
    }
    return res.redirect('/users/login');
};

