const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');



// Configuración de multer para guardar archivos en la carpeta 'public/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Límite de 10 MB para archivos
});

// Ruta del archivo JSON
const productsFilePath = path.join(__dirname, '../data/products.json');

// Función para leer el archivo JSON
const readProductsFile = () => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData);
};

// Función para escribir en el archivo JSON
const writeProductsFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 4));
};

// Listado de productos
router.get('/', (req, res) => {
    const products = readProductsFile();
    res.render('products/products', { products });
});

// Formulario de creación de productos
router.get('/create', (req, res) => {
    res.render('products/createProduct');
});

// Acción de creación (POST)
router.post('/', upload.single('image'), (req, res) => {
    const products = readProductsFile();

    // Encuentra el ID máximo existente
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;

    const newProduct = {
        id: maxId + 1, // Asigna el nuevo ID como el máximo + 1
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file ? `/uploads/${req.file.filename}` : '' // Ruta de la imagen
    };

    products.push(newProduct);
    writeProductsFile(products);
    res.redirect('/products');
});

// Detalle de un producto en particular
router.get('/:id', (req, res) => {
    const products = readProductsFile();
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.render('products/productDetail', { product });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Formulario de edición de productos
router.get('/:id/edit', (req, res) => {
    const products = readProductsFile();
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.render('products/editProduct', { product });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Acción de edición (PUT)
router.put('/:id', upload.single('image'), (req, res) => {
    const products = readProductsFile();
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = {
            id: products[index].id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? `/uploads/${req.file.filename}` : products[index].image
        };
        writeProductsFile(products);
        res.redirect('/products');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Acción de borrado (DELETE)
router.delete('/:id', (req, res) => {
    const products = readProductsFile();
    const product = products.find(p => p.id == req.params.id);

    if (product) {
        // Elimina la imagen del producto
        const imagePath = path.join(__dirname, '../public', product.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Elimina la imagen si existe
        }

        // Filtra el producto a eliminar y guarda la nueva lista
        const filteredProducts = products.filter(p => p.id != req.params.id);
        writeProductsFile(filteredProducts);
        res.redirect('/products');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;
