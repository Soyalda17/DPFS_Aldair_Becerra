// middlewares/auth.js

module.exports = function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};
