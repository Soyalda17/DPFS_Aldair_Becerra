const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');
const isAuthenticated = require('../middlewares/auth');
const usersController = require('../controllers/usersController'); 
const { body } = require('express-validator');

const methodOverride = require('method-override');

// Usar methodOverride para manejar el DELETE con formularios
router.use(methodOverride('_method'));

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/img');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Validaciones para crear y editar productos
const validateProduct = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('price')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .isFloat({ min: 0.01 }).withMessage('El precio debe ser un valor positivo'),
    body('description')
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    body('stock')
        .notEmpty().withMessage('El stock es obligatorio')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    body('category_id')
        .notEmpty().withMessage('Debes seleccionar una categoría')
];

// Mostrar el formulario de creación de producto
router.get('/create', productsController.showCreateProductForm);

// Manejar la creación de producto
router.post('/create', upload.single('image'), validateProduct, productsController.createProduct);

// Listar productos
router.get('/', productsController.listProducts);

// Mostrar detalle de producto
router.get('/:id', productsController.showProductDetail);

// Mostrar formulario de edición de producto
router.get('/edit/:id', productsController.showEditProductForm);

// Manejar actualización de producto
router.put('/edit/:id', upload.single('image'), validateProduct, productsController.updateProduct);

// Manejar eliminación de producto
router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;