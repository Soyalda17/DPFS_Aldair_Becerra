// test-db.js
const pool = require('./db'); // Ajusta la ruta si es necesario

pool.query('SELECT 1 + 1 AS solution')
  .then(([rows, fields]) => {
    console.log('The solution is: ', rows[0].solution);
  })
  .catch(console.error);
