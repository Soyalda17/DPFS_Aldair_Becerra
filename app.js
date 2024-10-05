const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const indexRouter = require('./api/json/routes/index');
const usersRouter = require('./api/json/routes/users');
const productsRouter = require('./api/json/routes/products');
const apiUsersRouter  = require('./api/json/routes/api/users');
const apiProductsRouter  = require('./api/json/routes/api/products');
const categoriesApiController   = require('./api/json/routes/api/categories');
const lastCreatedRoutes = require('./api/json/routes/api/lastCreated');

const isAuthenticated = require('./middlewares/auth');
const db = require('./database/models');
const cors = require('cors');

const app = express();

// Configuración de EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(methodOverride('_method'));

// Configuración de express-session
app.use(session({
  secret: 'OWFRJkDur6S2CY0RddBPj2IqJDWkU', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));

// Define las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', isAuthenticated, productsRouter);
app.use('/api/users', apiUsersRouter );
app.use('/api/products', apiProductsRouter );
app.use('/api/categories', categoriesApiController );
app.use('/api/lastCreated', lastCreatedRoutes);


// Sirviendo el dashboard (React) desde la carpeta 'build'
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard/build')));

// Servir el archivo index.html de React en caso de que accedas directamente
app.get('/dashboard/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard/build', 'index.html'));
});



// Manejo de errores 404
app.use((req, res, next) => {
  const error = new Error('Página no encontrada');
  error.status = 404;
  next(error);
});

// Sincronizar la base de datos
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos: ", err);
  });


module.exports = app;
