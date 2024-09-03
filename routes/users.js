// routes/users.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController'); 
const isAuthenticated = require('../middlewares/auth');
const productsController = require('../controllers/productsController'); 

// Configuración de multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Renombra el archivo para evitar duplicados y problemas de seguridad
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Rutas de registro
router.get('/register', usersController.showRegisterForm);
router.post('/register', upload.single('image'), usersController.processRegister);

// Rutas de login
router.get('/login', usersController.showLoginForm); 
router.post('/login', usersController.login);

// Ruta de perfil (requiere autenticación)
router.get('/profile', isAuthenticated, usersController.profile);

// Ruta para editar perfil
router.get('/editProfile', isAuthenticated, usersController.showEditProfileForm);
router.put('/editProfile', isAuthenticated, upload.single('image'), usersController.editProfile);


// Ruta para el dashboard del usuario
router.get('/sell', isAuthenticated, productsController.showDashboard);

// Ruta para procesar la creación del producto
router.post('/sell', isAuthenticated, upload.single('image'), productsController.createProduct);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/users/login'); // Redirige a la página de login o inicio
    });
});


  
module.exports = router;
