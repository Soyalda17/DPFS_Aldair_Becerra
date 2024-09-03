const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');
const isAuthenticated = require('../middlewares/auth');

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ruta para listar todos los productos
router.get('/', productsController.listUserProducts);

// Ruta para listar productos del usuario autenticado
router.get('/my-products', isAuthenticated, productsController.listUserProducts);

// Mostrar formulario de creación de producto
router.get('/create', isAuthenticated, productsController.showCreateProductForm);

// Procesar la creación de un producto
router.post('/create', isAuthenticated, upload.single('image'), productsController.createProduct);

// Detalle de un producto en particular
router.get('/:id', productsController.showProductDetail);


// Formulario de edición de productos
router.get('/:id/edit', isAuthenticated, productsController.showEditProductForm);

// Acción de edición (PUT)
router.put('/:id', isAuthenticated, upload.single('image'), productsController.updateProduct);

// Acción de borrado (DELETE)
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
