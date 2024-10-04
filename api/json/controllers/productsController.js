const db = require('../../../database/models'); 
const { validationResult } = require('express-validator');

// const fs = require('fs');
// const path = require('path');



// const productsFilePath = path.join(__dirname, '../data/products.json');
// const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper para leer y escribir el archivo JSON
// const readProductsFromFile = () => {
//     try {
//         const data = fs.readFileSync(productsFilePath, 'utf-8');
//         return JSON.parse(data);
//     } catch (err) {
//         console.error('Error leyendo el archivo de productos:', err);
//         return [];
//     }
// };

// const writeJSONFile = (filePath, data) => {
    //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // };
    
    
// Listar todos los productos
exports.listProducts = async (req, res) => {
    try {
        const user = req.session.user || null; // Obtener el usuario de la sesión

        // Obtener los productos desde la base de datos
        const products = await db.Product.findAll();

        // Renderizar la vista 'products/products' con los productos obtenidos
        res.render('products/products', { productos: products, user });
    } catch (error) {
        console.error('Error al listar los productos:', error);
        return res.status(500).send('Error interno del servidor');
    }
};
// Mostrar formulario de creación de producto
exports.showCreateProductForm = async (req, res) => {
    try {
        // Obtener las categorías desde la base de datos
        const categorias = await db.Category.findAll();

        const user = req.session.user || null;  // Si no hay usuario en la sesión, asignamos null

        res.render('products/createProduct', { 
            pageTitle: 'Crear Producto', 
            formAction: '/products/create',
            buttonText: 'Crear Producto',
            product: null,
            categorias,
            user
        });
    } catch (error) {
        console.error('Error al cargar el formulario de creación de producto:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const categorias = await db.Category.findAll();
        return res.render('products/createProduct', {
            pageTitle: 'Crear Producto',
            formAction: '/products/create',
            buttonText: 'Crear Producto',
            product: req.body,
            categorias,
            errorMessages: errors.array(),
            user: req.session.user
        });
    }

    try {
        const { name, price, stock, description, category_id } = req.body;

        // Verificar si hay una imagen subida
        let image = null;
        if (req.file) {
            image = req.file.filename; // Guardar el nombre del archivo subido
        }

        // Crear un nuevo producto en la base de datos
        await db.Product.create({
            name,
            price,
            stock: stock || 0,  // Establece un valor por defecto si no hay stock
            description: description || '',
            image: image || null,  // Guarda null si no hay imagen
            category_id
        });

        res.redirect('/'); // Redirigir a la página principal después de crear el producto
    } catch (error) {
        console.error('Error al crear el producto:', error.message);
        return res.status(500).send('Error interno del servidor');
    }
};

// Mostrar el índice de productos
exports.showIndex = async (req, res) => {
    try {
        const products = await db.Product.findAll({
            limit: 5, 
            order: [['created_at', 'DESC']] // Mostrar los productos más recientes.
        });

        // Renderiza la vista index.ejs y pasa los productos
        return res.render('index', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
};

// Mostrar los detalles de un producto
exports.showProductDetail = async (req, res) => {
    try {
        const productId = req.params.id;

        // Busca el producto en la base de datos por su ID
        const product = await db.Product.findByPk(productId);

        // Verifica si el producto fue encontrado
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Obtén el usuario de la sesión
        const user = req.session.user || null;

        // Renderiza la vista de detalles del producto, pasando el producto y el usuario
        return res.render('products/productDetails', { product, user });
    } catch (error) {
        console.error('Error al mostrar el detalle del producto:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

// Mostrar formulario de edición de producto
exports.showEditProductForm = async (req, res) => {
    try {
        const productId = req.params.id;

        // Busca el producto en la base de datos
        const product = await db.Product.findByPk(productId);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Busca las categorías
        const categorias = await db.Category.findAll();

        // Obtén el usuario de la sesión
        const user = req.session.user || null;

        // Renderiza la vista de edición, pasando el producto, las categorías y el usuario
        return res.render('products/editProduct', {
            product,
            categorias,
            user, 
            errorMessages: []
        });
    } catch (error) {
        console.error('Error al mostrar el formulario de edición del producto:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const categorias = await db.Category.findAll();
        return res.render('products/editProduct', {
            product: { ...req.body, id: req.params.id },
            categorias,
            errorMessages: errors.array(),
            user: req.session.user
        });
    }

    try {
        const productId = req.params.id;

        // Encuentra el producto por su ID
        const product = await db.Product.findByPk(productId);

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Verificar si hay una imagen subida
        let image = product.image; 
        if (req.file) {
            image = req.file.filename;
        }

        // Actualiza los campos del producto
        await product.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category_id: req.body.category_id,
            image: image,
            updated_at: new Date()
        });

        return res.redirect(`/products/${productId}`);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).send('Error interno del servidor');
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Eliminar el producto de la base de datos
        await db.Product.destroy({
            where: { id: productId }
        });

        // Redirigir a la lista de productos después de eliminar
        return res.redirect('/products');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

// Controlador para mostrar el dashboard
exports.showDashboard = async (req, res) => {
    try {
        // Consultar productos y usuarios
        const products = await db.Product.findAll();  // Obtener todos los productos
        const users = await db.User.findAll();        // Obtener todos los usuarios

        // Renderizar el dashboard con los productos y usuarios
        res.render('dashboard', { products, users });
    } catch (error) {
        console.error('Error al mostrar el dashboard:', error);
        res.status(500).send('Error al mostrar el dashboard');
    }
};
