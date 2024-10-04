-- Poblar la tabla de usuarios
INSERT INTO users (name, email, password, phone, location) VALUES
('John Doe', 'john.doe@gmail.com', 'hashed_password_1', '1234567890', 'New York'),
('Jane Smith', 'jane.smith@gmail.com', 'hashed_password_2', '0987654321', 'Los Angeles'),
('Michael Brown', 'michael.brown@gmail.com', 'hashed_password_3', '1231231234', 'Chicago');

-- Poblar la tabla de categorías
INSERT INTO categories (name) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Furniture');

-- Poblar la tabla de productos
INSERT INTO products (name, price, description, stock, category_id) VALUES
('Smartphone', 699.99, 'High-end smartphone with 128GB storage', 10, 1),
('Laptop', 1299.99, '15-inch laptop with 16GB RAM', 5, 1),
('T-shirt', 19.99, 'Cotton T-shirt in various sizes', 50, 2),
('Bookshelf', 89.99, 'Wooden bookshelf with 5 shelves', 20, 4);

-- Poblar la tabla de carritos
INSERT INTO cart (user_id, total) VALUES
(1, 719.98),
(2, 89.99);

-- Poblar la tabla de ítems de carrito
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 1),  -- John Doe compra 1 Smartphone
(1, 2, 1),  -- John Doe compra 1 Laptop
(2, 4, 1);  -- Jane Smith compra 1 Bookshelf
