// Importa las dependencias necesarias y la conexión a la base de datos
const db = require('../db'); 
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Asegúrate de que esta ruta exista
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Mostrar formulario de registro
exports.showRegisterForm = (req, res) => {
    res.render('users/register');
};

exports.processRegister = async (req, res) => {
    try {
        const { name, email, password, phone, role, location } = req.body;
        const image = req.file ? req.file.filename : null; // Si estás usando `multer` para manejar la carga de archivos

        // Verificar que todos los campos requeridos estén presentes
        if (!name || !email || !password || !phone || !role || !location) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Obtener la fecha actual para el campo `created_at`
        const createdAt = new Date();

        // Ejecutar la consulta SQL para insertar el usuario
        await db.query(
            'INSERT INTO users (name, email, password, created_at, phone, role, image, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, createdAt, phone, role, image, location]
        );

        // Redirigir al usuario a la página de login después del registro exitoso
        res.redirect('/users/login');
    } catch (err) {
        console.error('Error al registrar el usuario:', err); // Imprimir detalles del error en la consola
        res.status(500).send('Error al registrar el usuario');
    }
};

// Mostrar formulario de login
exports.showLoginForm = (req, res) => {
    res.render('users/login');
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length > 0 && await bcrypt.compare(password, users[0].password)) {
            req.session.user = users[0]; // Establece la sesión del usuario
            res.redirect('/users/profile');
        } else {
            res.status(401).send('Email o contraseña incorrectos');
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error al iniciar sesión');
    }
};

// Mostrar perfil
exports.profile = (req, res) => {
    res.render('users/profile', { user: req.session.user });
};

// Mostrar formulario para editar perfil
exports.showEditProfileForm = (req, res) => {
    res.render('users/editProfile', { user: req.session.user });
};

// Editar perfil
exports.editProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const image = req.file ? req.file.filename : req.session.user.image; // Verifica si hay una nueva imagen

        if (!name || !email) {
            return res.status(400).send('El nombre y el correo no pueden estar vacíos.');
        }

        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.session.user.id]);

        if (user.length > 0) {
            let hashedPassword = user[0].password;
            if (req.body.password) {
                hashedPassword = await bcrypt.hash(req.body.password, 10);
            }

            await db.query('UPDATE users SET name = ?, email = ?, password = ?, phone = ?, image = ? WHERE id = ?',
                [name, email, hashedPassword, phone, image, req.session.user.id]);

            req.session.user = { ...req.session.user, name, email, phone, image };
            res.redirect('/users/profile');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error al actualizar el perfil:', err);
        res.status(500).send('Error al actualizar el perfil');
    }
};