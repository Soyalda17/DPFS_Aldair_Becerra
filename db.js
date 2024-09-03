// db.js
const mysql = require('mysql2');

// Configura el pool de conexiones con promesas
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yurito24$', // Asegúrate de que la contraseña sea correcta
    database: 'cratedrop',
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0
});

// Exporta el pool usando promesas para un manejo más fácil
module.exports = pool.promise();  // Aquí se utiliza el método 'promise()'
