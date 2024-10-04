const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');
const isAuthenticated = require('../../middlewares/auth');
const usersController = require('../controllers/usersController'); 

// Mostrar dashboard
router.get('/dashboard', productsController.showDashboard);


module.exports = router;

