const express = require('express');
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const isAuthenticated = require('../../../middlewares/auth');
const isGuest = require('../../../middlewares/guest');
const db = require('../../../database/models');
const router = express.Router();
const { body } = require('express-validator');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Subiendo archivo a:', path.join(__dirname, '../../../uploads'));
        cb(null, path.join(__dirname, '../../../uploads'));
    },
    filename: (req, file, cb) => {
        let fileName = `user-${Date.now()}${path.extname(file.originalname)}`;
        console.log('Nombre del archivo subido:', fileName); 
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return cb(new Error('Solo se permiten archivos de imagen (.jpg, .jpeg, .png, .gif)'));
        }
        cb(null, true);
    }
});

// Ruta para el formulario de registro
router.get('/register', isGuest, usersController.showRegisterForm);

// Ruta POST para procesar el registro
router.post('/register', upload.single('image'), [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debes ingresar un email válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
], usersController.processRegister);

// Ruta para el formulario de login
router.get('/login', isGuest, usersController.showLoginForm);

// Ruta POST para procesar el login con validaciones
router.post('/login', [
    body('email').isEmail().withMessage('Debe ser un email válido.'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
], usersController.processLogin);

// Ruta para el perfil 
router.get('/profile', isAuthenticated, usersController.showProfile);

// Ruta para mostrar el formulario de edición de perfil
router.get('/profile/edit', usersController.showEditProfile);

// Ruta para procesar los cambios en el perfil con validaciones
router.post('/profile/edit', upload.single('image'), [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debes ingresar un email válido'),
    body('telefono').isLength({ min: 9 }).withMessage('El teléfono debe tener al menos 9 dígitos'),
    body('location').notEmpty().withMessage('La ubicación es obligatoria'),
], usersController.processEditProfile);

// Ruta para el logout 
router.post('/logout', isAuthenticated, usersController.logout);

module.exports = router;