document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');


    // Añadir producto al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const productId = button.getAttribute('data-product-id');

            // Enviar petición al servidor para añadir el producto al carrito
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity: 1 }) // Puedes ajustar la cantidad si es necesario
            });

            if (response.ok) {
                // Mostrar una notificación de que el producto fue añadido al carrito
                alert('Producto añadido al carrito');
            } else {
                // Manejar cualquier error
                alert('Hubo un error al añadir el producto al carrito');
            }
        });
    });

    // Función para recalcular el subtotal y total
    function updateTotals() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');

        cartItems.forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            subtotal += price * quantity;
        });

        // Calcular total agregando costos adicionales
        const deliveryCost = 3.00;
        const tax = 3.00;
        const serviceCharge = 3.00;
        const total = subtotal + deliveryCost + tax + serviceCharge;

        // Actualizar los valores de subtotal y total en la página
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    // Escuchar los botones de cantidad y de eliminar
    cartItemsContainer.addEventListener('click', async (e) => {
        const target = e.target;

        // Acción de incrementar/decrementar cantidad
        if (target.classList.contains('quantity-button')) {
            const productId = target.getAttribute('data-product-id');
            const action = target.getAttribute('data-action'); // 'increase' o 'decrease'
            const quantityInput = target.parentElement.querySelector('.quantity-input');

            let newQuantity = parseInt(quantityInput.value);

            if (action === 'increase') {
                newQuantity++;
            } else if (action === 'decrease' && newQuantity > 1) {
                newQuantity--;
            }

            // Actualizar la cantidad visualmente antes de hacer la petición
            quantityInput.value = newQuantity;

            // Actualizar el carrito en el servidor
            const response = await fetch('/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity: newQuantity })
            });

            if (response.ok) {
                // Recalcular totales después de actualizar la cantidad
                const cartItem = target.closest('.cart-update');
                cartItem.update();
                updateTotals();
            } else {
                alert('Hubo un error al actualizar el carrito.');
            }
        }

        // Acción de eliminar un producto
        if (target.classList.contains('remove-button')) {
            const productId = target.getAttribute('data-product-id');

            const response = await fetch('/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            if (response.ok) {
                // Eliminar el elemento visualmente sin refrescar la página
                const cartItem = target.closest('.cart-item');
                cartItem.remove();

                // Recalcular totales
                updateTotals();
            } else {
                alert('Hubo un error al eliminar el producto.');
            }
        }
    });

    // Calcular los totales al cargar la página por primera vez
    updateTotals();
});


