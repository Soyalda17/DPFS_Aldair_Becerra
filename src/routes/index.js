const express = require('express');
const router = express.Router();
const db = require('../database/models'); // Conexión a la base de datos

router.get('/', async (req, res) => {
  const user = req.session.user;

  try {
    // Obtener productos desde la base de datos
    const productsFromDb = await db.Product.findAll();
    const categories = await db.Category.findAll();

    // Renderizar la vista 'index' con los datos de la base de datos
    res.render('index', { 
      user, 
      products: productsFromDb, 
      categorias: categories, 
    });
  } catch (error) {
    console.error('Error al obtener los productos desde la base de datos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;