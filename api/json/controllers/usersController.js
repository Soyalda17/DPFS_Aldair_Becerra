// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../../../database/models'); // Asegúrate de requerir la conexión a la base de datos
const { validationResult } = require('express-validator');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// let users = require(usersFilePath); // Comentar esta línea para no usar el archivo JSON


const usersController = {
    // list: async (req, res) => {
    //     try {
    //         // Obtenemos el número de página de la consulta, por defecto es la página 1
    //         const page = req.query.page ? parseInt(req.query.page) : 1;
    //         const limit = 10; // Número de usuarios por página
    //         const offset = (page - 1) * limit; // Desplazamiento según la página

    //         // Usamos Sequelize para obtener los usuarios con paginación
    //         const users = await User.findAndCountAll({
    //             limit,
    //             offset,
    //             attributes: ['id', 'name', 'email'], // Puedes ajustar los atributos que quieres devolver
    //         });

    //         // Calculamos la cantidad de páginas
    //         const totalPages = Math.ceil(users.count / limit);

    //         // Enviamos la respuesta con los usuarios y los datos de paginación
    //         res.json({
    //             users: users.rows,
    //             totalPages,
    //             currentPage: page,
    //             next: page < totalPages ? `/api/users?page=${page + 1}` : null,
    //             previous: page > 1 ? `/api/users?page=${page - 1}` : null,
    //         });
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error al obtener el listado de usuarios' });
    //     }
    // },

    // detail: async (req, res) => {
    //     try {
    //         const userId = req.params.id;

    //         // Buscar el usuario por su ID
    //         const user = await User.findByPk(userId, {
    //             attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'], // Ajusta los atributos según tus necesidades
    //         });

    //         // Si no se encuentra el usuario, enviar error 404
    //         if (!user) {
    //             return res.status(404).json({ error: 'Usuario no encontrado' });
    //         }

    //         // Enviar los datos del usuario
    //         res.json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Error al obtener el detalle del usuario' });
    //     }
    // },
    
    showRegisterForm: (req, res) => {
        res.render('users/register', {
            errorMessages: [],
            oldData: {}
        });
    },

    processRegister: async (req, res) => {
        console.log('Entrando al controlador processRegister');  // Verificar si llega al controlador

        // Validación de errores del formulario
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array());  // Ver errores de validación
            return res.render('users/register', {
                errorMessages: errors.array(),
                oldData: req.body
            });
        }

        try {
            console.log('Buscando si el usuario ya existe...');  // Ver si llega a la verificación del usuario

            // Verificar si el email ya está registrado en la base de datos
            const existingUser = await db.User.findOne({ where: { email: req.body.email } });
            if (existingUser) {
                console.log('El email ya está registrado:', req.body.email);  // Ver si ya existe el usuario
                return res.render('users/register', {
                    errorMessages: [{ msg: "El email ya está registrado" }],
                    oldData: req.body
                });
            }

            console.log('Hasheando la contraseña...');  // Ver si llega al paso de hashear la contraseña
            // Hash de la contraseña
            let hashedPassword = await bcrypt.hash(req.body.password, 10);

            console.log('Creando nuevo usuario...');  // Ver si llega al intento de creación del usuario
            // Crear un nuevo usuario en la base de datos
            const newUser = await db.User.create({
                name: req.body.nombre,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.telefono,
                location: req.body.location,
                image: req.file ? req.file.filename : null,  // Solo se guarda el nombre de la imagen si hay una
                role: "user",
                created_at: new Date()
            });

            console.log('Usuario creado con éxito:', newUser);  // Ver si el usuario fue creado correctamente

            // Redirigir al formulario de login después de registrar
            console.log('Redirigiendo a /users/login');
            return res.redirect('/users/login');

        } catch (error) {
            console.error('Error al registrar el usuario:', error);  // Captura cualquier error durante el registro
            return res.status(500).send('Error interno del servidor');
        }
    },

    // Resto de las funciones del controlador
    showLoginForm: (req, res) => {
        res.render('users/login', {
            errorMessages: [],
            oldData: {}
        });
    },

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/login', {
                errorMessages: errors.array(),
                oldData: req.body
            });
        }

        try {
            // Buscar el usuario por su email en la base de datos
            let user = await db.User.findOne({ where: { email: req.body.email } });

            // Si el usuario existe y la contraseña es correcta
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                req.session.userLogged = user;
                req.session.user = {
                    id: user.id,
                    email: user.email
                };

                // Guardar la cookie si el usuario seleccionó "recordarme"
                if (req.body.remember) {
                    res.cookie('userId', user.id, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                }

                // Redirigir al perfil del usuario
                return res.redirect('/users/profile');
            }

            return res.render('users/login', {
                errorMessages: [{ msg: "Email o contraseña incorrectos" }],
                oldData: req.body
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    showProfile: (req, res) => {
        console.log('Datos del usuario:', req.session.userLogged);
        console.log('Imagen del usuario:', req.session.userLogged.image);
        res.render('users/profile', { user: req.session.userLogged });
    },

    // mostrar el formulario de edición de perfil
    showEditProfile: (req, res) => {
        res.render('users/editProfile', {
            user: req.session.userLogged,
            errorMessages: [] // Asegúrate de pasar la variable 'errorMessages'
        });
    },

    // Procesar la actualización del perfil
    processEditProfile: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('users/editProfile', {
                errorMessages: errors.array(),
                user: req.session.userLogged
            });
        }

        try {
            const user = await db.User.findByPk(req.session.userLogged.id);

            user.name = req.body.nombre;
            user.email = req.body.email;
            user.phone = req.body.telefono;
            user.location = req.body.location;

            if (req.file) {
                user.image = req.file.filename;
            }

            await user.save();
            req.session.userLogged = user;

            return res.redirect('/users/profile');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            return res.status(500).send('Error interno del servidor');
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al cerrar sesión');
            }
            res.clearCookie('user_sid');
            res.redirect('/');
        });
    }

};

module.exports = usersController;
