const express = require('express');
const router = express.Router();
const lastCreatedApiController = require('../../controllers/api/lastCreatedApiController');

// Ruta para obtener el último producto creado
router.get('/last', lastCreatedApiController.lastCreated);

module.exports = router;
