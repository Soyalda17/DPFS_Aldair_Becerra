
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // El usuario está autenticado, continuar
    } else {
        return res.redirect('/users/login'); // Redirigir al inicio de sesión
    }
}

module.exports = isAuthenticated;
