const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../db'); // Conexión a la base de datos
const productsController = require('../controllers/productsController'); // Importa el controlador de productos

// Ruta del archivo JSON de productos
const productsFilePath = path.join(__dirname, '../data/products.json');

// Función para leer el archivo JSON de productos
const readProductsFile = () => {
  const productsData = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(productsData);
};

// Obtener categorías y subcategorías desde la base de datos
const getCategorias = async () => {
  try {
    const [categorias] = await db.query('SELECT * FROM categories');
    const [subcategorias] = await db.query('SELECT * FROM subcategories');
    return { categorias, subcategorias };
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return { categorias: [], subcategorias: [] };
  }
};

// Ruta para la página principal
router.get('/', async (req, res) => {
  const user = req.session.user; // Obtén el usuario de la sesión
  const productsFromJson = readProductsFile(); // Lee los productos desde el archivo JSON

  try {
    const { categorias, subcategorias } = await getCategorias(); // Obtiene las categorías y subcategorías de la BD

    // Obtiene los productos recomendados de la base de datos
    const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC LIMIT 8');

    res.render('index', { user, products, categorias, subcategorias, productsFromJson }); // Pasa los datos a la vista
  } catch (error) {
    console.error('Error al renderizar la página principal:', error);
    res.status(500).send('Error al cargar la página principal');
  }
});

module.exports = router;

