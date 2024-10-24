const db = require('../database/models'); 

// Mostrar el carrito
exports.showCart = async (req, res) => {
    const cart = req.session.cart || []; // Productos del carrito almacenados en la sesión
    const { user } = req.session;

    // Si el carrito está vacío, renderizar la vista sin productos
    if (cart.length === 0) {
        return res.render('products/cart', { cart: [], user });
    }

    try {
        // Obtener los detalles de cada producto desde la base de datos
        const productsWithDetails = await Promise.all(cart.map(async (item) => {
            const product = await db.Product.findByPk(item.productId);
            if (product) {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: item.quantity // Cantidad almacenada en la sesión
                };
            }
        }));

        // Filtrar productos nulos en caso de que algún ID no exista
        const filteredProducts = productsWithDetails.filter(product => product !== undefined);

        // Renderizar la vista del carrito con los detalles completos de los productos
        res.render('products/cart', { cart: filteredProducts, user });
    } catch (error) {
        console.error('Error al mostrar el carrito:', error.message);
        return res.status(500).send('Error interno del servidor');
    }
};

// Agregar un producto al carrito
exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    req.session.cart = req.session.cart || [];
    req.session.cart.push({ productId, quantity });
    res.redirect('/cart');
};

// Actualizar la cantidad de un producto en el carrito
exports.updateCart = (req, res) => {
    const { productId, quantity } = req.body;
    req.session.cart = req.session.cart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
    );
    
    // En lugar de redirigir, enviamos una respuesta JSON
    res.json({ success: true, message: 'Carrito actualizado correctamente' });
};


// Eliminar un producto del carrito
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    res.redirect('/cart');
};

// Finalizar la compra
exports.checkout = (req, res) => {
    const cart = req.session.cart;
    req.session.cart = []; // Vaciar el carrito después de la compra
    res.redirect('/users/profile'); // Redirigir al perfil del usuario o página de confirmación
};
