const db = require('../../database/models');

// Obtener el carrito
exports.getCart = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const cart = await db.Cart.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: db.CartItem,
                    as: 'items',
                    include: [
                        {
                            model: db.Product,
                            as: 'product',
                            attributes: ['id', 'name', 'price', 'image']
                        }
                    ]
                }
            ]
        });
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ cart: [], message: 'El carrito está vacío.' });
        }

        const cartWithDetails = cart.items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity
        }));

        res.status(200).json({ cart: cartWithDetails });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al procesar el carrito' });
    }
};

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.user.id;
        let cart = await db.Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await db.Cart.create({ user_id: userId, total: 0 });
        }
        let cartItem = await db.CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await db.CartItem.create({ cart_id: cart.id, product_id: productId, quantity });
        }
        res.status(200).json({ message: 'Producto añadido al carrito.' });
    } catch (error) {
        console.error('Error al añadir al carrito:', error);
        res.status(500).json({ error: 'Error al procesar el carrito' });
    }
};

// Actualizar la cantidad de un producto en el carrito
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.user.id;
        const cart = await db.Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(400).json({ error: 'No se encontró el carrito.' });
        }
        const cartItem = await db.CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
        if (!cartItem) {
            return res.status(400).json({ error: 'El producto no está en el carrito.' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cantidad actualizada en el carrito.' });
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).json({ error: 'Error al procesar el carrito' });
    }
};

// Eliminar un producto del carrito
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    
    // Filtrar el carrito para eliminar el producto
    req.session.cart = req.session.cart.filter(item => item.productId !== productId);

    // Recalcular el subtotal después de eliminar el producto
    const cart = req.session.cart || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 3 + 3 + 3; // Agregar impuestos y cargos adicionales si es necesario (cambiar si es necesario)

    // Renderizar nuevamente la vista con los valores actualizados
    res.render('products/cart', { cart, user: req.session.user, subtotal, total });
};
