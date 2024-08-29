const db = require('../db'); // Importa la conexión a la base de datos
const bcrypt = require('bcrypt');

const usersController = {
    showRegisterForm: (req, res) => {
        res.render('users/register');
    },

    processRegister: async (req, res) => {
        const { firstName, lastName, email, password, phone } = req.body;

        // Validar campos básicos
        if (!firstName || !lastName || !email || !password || !phone) {
            console.log('Faltan campos en el formulario de registro.');
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const name = `${firstName} ${lastName}`; // Combina el nombre y apellido

        try {
            // Verificar si el email ya está registrado
            db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
                if (err) {
                    console.error('Error al verificar el email:', err);
                    return res.status(500).send('Error en el servidor');
                }

                if (results.length > 0) {
                    console.log('El email ya está registrado:', email);
                    return res.status(400).send('Este email ya está registrado');
                }

                // Hashear la contraseña
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insertar el nuevo usuario en la base de datos
                db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, phone], (err, results) => {
                    if (err) {
                        console.error('Error al insertar el usuario en la base de datos:', err);
                        return res.status(500).send('Error en el servidor');
                    }

                    // Guardar el usuario en la sesión
                    req.session.user = {
                        id: results.insertId,
                        name: name,
                        email: email,
                        phone: phone
                    };

                    // Redirigir al perfil
                    res.redirect('/users/profile');
                });
            });
        } catch (err) {
            console.error('Error general en el registro:', err);
            res.status(500).send('Error en el servidor');
        }
    },

    login: async (req, res) => {
        console.log('Datos recibidos en login:', req.body); // Log para revisar los datos recibidos
        const { email, password } = req.body;

        // Validar campos básicos
        if (!email || !password) {
            console.log('Faltan campos en el formulario de login.');
            return res.status(400).send('Todos los campos son obligatorios');
        }

        // Verificar el usuario en la base de datos
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error al verificar el usuario en la base de datos:', err);
                return res.status(500).send('Error en el servidor');
            }

            if (results.length === 0) {
                console.log('Email no encontrado o contraseña incorrecta:', email);
                return res.status(400).send('Email o contraseña incorrectos');
            }

            const user = results[0];

            // Comparar la contraseña
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log('Contraseña incorrecta para el email:', email);
                return res.status(400).send('Email o contraseña incorrectos');
            }

            // Guardar el usuario en la sesión
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            // Redirigir al perfil
            res.redirect('/users/profile');
        });
    },

    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/users/login');
        }
        res.render('users/profile', {
            user: req.session.user
        });
    }
};

module.exports = usersController;
