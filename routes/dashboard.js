const express = require('express');
const router = express.Router();

// Ruta para la página de dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});


module.exports = router;

