const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const productsFilePath = path.join(__dirname, '../data/products.json');

// Función para leer el archivo JSON
const readProductsFile = () => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsData);
};


// Definir las categorías (puedes personalizarlas según tus datos)
const categorias = [
  { name: 'Ropa', image: '/images/categories/ropa.png' },
  { name: 'Electrónica', image: '/images/categories/electronica.png' },
  { name: 'Hogar', image: '/images/categories/hogar.png' },
  { name: 'Deportes', image: '/images/categories/deportes.png' },
  { name: 'Libros', image: '/images/categories/libros.png' }
];

// Ruta para la página principal
router.get('/', (req, res) => {
    const products = readProductsFile(); // Lee los productos desde el archivo JSON
    res.render('index', { products, categorias }); // Pasa los productos a la vista
});

module.exports = router;
