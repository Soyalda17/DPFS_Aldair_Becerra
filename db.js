// // db.js
// const mysql = require('mysql2');

// // Configura el pool de conexiones con promesas
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Yurito24$', // Asegúrate de que la contraseña sea correcta
//     database: 'cratedrop',
//     waitForConnections: true,
//     connectionLimit: 10, // Número máximo de conexiones en el pool
//     queueLimit: 0
// });

// // Exporta el pool usando promesas para un manejo más fácil
// const promisePool = pool.promise();

// // Realiza una consulta para verificar la conexión
// promisePool.query('SELECT 1 + 1 AS solution')
//     .then(([rows, fields]) => {
//         console.log('Conexión a la base de datos exitosa. La solución es:', rows[0].solution);
//     })
//     .catch(console.error);

// module.exports = promisePool;
