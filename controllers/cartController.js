
// Mostrar el carrito
exports.showCart = (req, res) => {
    // Aquí puedes obtener los productos del carrito desde la sesión o base de datos
    const cart = req.session.cart || []; // Ejemplo: Obtener el carrito de la sesión
    res.render('products/cart', { cart, user: req.session.user }); // Renderizar la vista del carrito
};

// Agregar un producto al carrito
exports.addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    // Lógica para agregar el producto al carrito
    // Ejemplo: Actualizar el carrito en la sesión
    req.session.cart = req.session.cart || [];
    req.session.cart.push({ productId, quantity });
    res.redirect('/cart');
};

// Actualizar la cantidad de un producto en el carrito
exports.updateCart = (req, res) => {
    const { productId, quantity } = req.body;
    // Lógica para actualizar la cantidad del producto en el carrito
    // Ejemplo: Actualizar el carrito en la sesión
    req.session.cart = req.session.cart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
    );
    res.redirect('/cart');
};

// Eliminar un producto del carrito
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    // Lógica para eliminar el producto del carrito
    // Ejemplo: Actualizar el carrito en la sesión
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    res.redirect('/cart');
};

// Finalizar la compra
exports.checkout = (req, res) => {
    const cart = req.session.cart;
    // Lógica para procesar la compra
    // Ejemplo: Guardar la orden en la base de datos, limpiar el carrito, etc.
    req.session.cart = []; // Vaciar el carrito después de la compra
    res.redirect('/users/profile'); // Redirigir al perfil del usuario o página de confirmación
};
