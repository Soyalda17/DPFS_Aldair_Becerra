-- -- Crear base de datos
-- CREATE DATABASE crate_drop;

-- -- Usar la base de datos
-- USE crate_drop;

-- -- Crear tabla de usuarios
-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     phone VARCHAR(15),
--     location VARCHAR(100),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Crear tabla de categorías
-- CREATE TABLE categories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

-- -- Crear tabla de productos
-- CREATE TABLE products (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     price DECIMAL(10, 2) NOT NULL,
--     description TEXT,
--     stock INT DEFAULT 0,
--     category_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id)
-- );

-- -- Crear tabla de carritos (opcional)
-- CREATE TABLE cart (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     total DECIMAL(10, 2),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- -- Crear tabla de ítems de carrito (opcional)
-- CREATE TABLE cart_items (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     cart_id INT,
--     product_id INT,
--     quantity INT NOT NULL,
--     CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(id),
--     CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id)
-- );

