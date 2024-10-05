// routes/api/users.js
const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

// Ruta para listar usuarios con paginado
router.get('/', usersApiController.list);

// Ruta para obtener el detalle de un usuario
router.get('/:id', usersApiController.detail);

module.exports = router;

