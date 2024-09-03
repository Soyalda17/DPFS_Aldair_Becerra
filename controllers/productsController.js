const db = require('../db'); // Importa la conexión a la base de datos

// Mostrar el formulario de creación de producto
exports.showCreateProductForm = (req, res) => {
    const user = req.session.user; // Obtener el usuario de la sesión
    const categorias = [
        'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Belleza y Salud', 
        'Automotriz', 'Juguetes', 'Libros', 'Tecnología', 'Jardinería'
    ];

    const subcategorias = [
        'Smartphones', 'Tablets', 'Laptops', 'Camisas', 'Pantalones', 
        'Muebles', 'Decoración', 'Ropa Deportiva', 'Maquillaje', 'Accesorios para Autos'
    ];

    res.render('products/createProduct', { 
        pageTitle: 'Crear Producto',
        formAction: '/products/create',
        product: null, // No hay producto definido porque es un formulario de creación
        categorias,
        subcategorias,
        buttonText: 'Crear Producto', // Texto del botón
        user
    });
};

exports.createProduct = async (req, res) => {
    try {
        // Usa solo product_condition
        const { name, description, price, category, subcategory, brand, model, inventory, product_condition, location, delivery_method, negotiable } = req.body;
        const image = req.file ? req.file.filename : null;
        const userId = req.session.user.id;

        await db.query(
            'INSERT INTO products (name, description, price, category, subcategory, brand, model, inventory, product_condition, location, delivery_method, negotiable, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, category, subcategory, brand, model, inventory, product_condition, location, delivery_method, negotiable, image, userId]
        );

        res.redirect('/products');
    } catch (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).send('Error al crear el producto');
    }
};


// Listar todos los productos
exports.showProductDetail = async (req, res) => {
    try {
        const productId = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

        if (product.length > 0) {
            // Pasa el usuario a la vista si está en la sesión
            res.render('products/productDetails', { 
                product: product[0], 
                user: req.session.user || null // Asegúrate de pasar el usuario, o null si no existe
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        console.error('Error al mostrar el detalle del producto:', err);
        res.status(500).send('Error al mostrar el detalle del producto');
    }
};


// Mostrar los productos del usuario autenticado
exports.listUserProducts = async (req, res) => {
    try {
        const userId = req.session.user.id; // Verifica que `user` esté definido en la sesión
        const [products] = await db.query('SELECT * FROM products WHERE user_id = ?', [userId]);
        res.render('products/dashboard', { products, user: req.session.user });
    } catch (err) {
        console.error('Error al listar los productos del usuario:', err);
        res.status(500).send('Error al listar los productos');
    }
};

exports.showProductDetail = async (req, res) => {
    try {
        const productId = req.params.id; // Obtener el ID del producto de los parámetros de la ruta
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

        if (product.length > 0) {
            // Pasa el usuario a la vista si está en la sesión
            res.render('products/productDetails', { 
                product: product[0], 
                user: req.session.user || null // Pasa el usuario a la vista o null si no está definido
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        console.error('Error al mostrar el detalle del producto:', err);
        res.status(500).send('Error al mostrar el detalle del producto');
    }
};


// Mostrar el formulario de creación de producto
exports.showCreateProductForm = (req, res) => {
    const user = req.session.user; // Obtener el usuario de la sesión
    const categorias = [
        'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Belleza y Salud', 
        'Automotriz', 'Juguetes', 'Libros', 'Tecnología', 'Jardinería'
    ];

    const subcategorias = [
        'Smartphones', 'Tablets', 'Laptops', 'Camisas', 'Pantalones', 
        'Muebles', 'Decoración', 'Ropa Deportiva', 'Maquillaje', 'Accesorios para Autos'
    ];

    res.render('products/createProduct', { 
        pageTitle: 'Crear Producto',
        formAction: '/products/create',
        product: null, // No hay producto definido porque es un formulario de creación
        categorias,
        subcategorias,
        buttonText: 'Crear Producto', // Texto del botón
        user
    });
};

// Mostrar el formulario de edición de producto
exports.showEditProductForm = async (req, res) => {
    try {
        const user = req.session.user; 
        const categorias = [
            'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Belleza y Salud', 
            'Automotriz', 'Juguetes', 'Libros', 'Tecnología', 'Jardinería'
        ];

        const subcategorias = [
            'Smartphones', 'Tablets', 'Laptops', 'Camisas', 'Pantalones', 
            'Muebles', 'Decoración', 'Ropa Deportiva', 'Maquillaje', 'Accesorios para Autos'
        ];

        // Obtener el producto desde la base de datos usando el ID
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

        res.render('products/createProduct', { 
            pageTitle: 'Editar Producto',
            formAction: `/products/${req.params.id}?_method=PUT`,
            product: product[0], // Pasar el producto recuperado a la vista
            categorias,
            subcategorias,
            buttonText: 'Guardar Cambios', // Texto del botón para la edición
            user
        });
    } catch (error) {
        console.error('Error al cargar el formulario de edición:', error);
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category, subcategory, brand, model, inventory, product_condition, location, delivery_method, negotiable } = req.body;
        const image = req.file ? req.file.filename : req.body.existingImage; // Usa la imagen existente si no se sube una nueva

        await db.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, subcategory = ?, brand = ?, model = ?, inventory = ?, `product_condition` = ?, location = ?, delivery_method = ?, negotiable = ?, image = ? WHERE id = ?',
            [name, description, price, category, subcategory, brand, model, inventory, product_condition, location, delivery_method, negotiable, image, productId]
        );

        res.redirect('products/sell'); // Redirige a la lista de productos del usuario
    } catch (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).send('Error al actualizar el producto');
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await db.query('DELETE FROM products WHERE id = ?', [productId]);
        res.redirect('/products/my-products'); // Redirige a la lista de productos del usuario
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).send('Error al eliminar el producto');
    }
};

// Controlador para mostrar el dashboard
exports.showDashboard = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const [products] = await db.query('SELECT * FROM products WHERE user_id = ?', [userId]);
        res.render('products/sell', { user: req.session.user, products }); // Asegúrate de usar 'products/sell'
    } catch (err) {
        console.error('Error al cargar el dashboard:', err);
        res.status(500).send('Error al cargar el dashboard');
    }
};


