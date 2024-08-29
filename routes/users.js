const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); 
const isAuthenticated = require('../middlewares/auth');

// Rutas de registro
router.get('/register', usersController.showRegisterForm);
router.post('/register', usersController.processRegister);

// Rutas de login
router.get('/login', (req, res) => res.render('users/login'));
router.post('/login', usersController.login);

// Ruta de perfil (requiere autenticación)
router.get('/profile', isAuthenticated, usersController.profile);

module.exports = router;
