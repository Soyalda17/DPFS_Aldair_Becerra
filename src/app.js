const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/products');
const categoriesApiController = require('./routes/api/categories');
const lastCreatedRoutes = require('./routes/api/lastCreated');
const cartApiRouter  = require('./routes/api/cart');
const cartRouter = require('./routes/cart');


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
app.use(methodOverride('_method'));

// Configuración de express-session
app.use(session({
  secret: 'OWFRJkDur6S2CY0RddBPj2IqJDWkU', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 día
    path: '/',
  }
}));

// Define las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', isAuthenticated, productsRouter);
app.use('/cart', isAuthenticated, cartRouter);
app.use('/api/users', apiUsersRouter );
app.use('/api/products', apiProductsRouter );
app.use('/api/categories', categoriesApiController );
app.use('/api/lastCreated', lastCreatedRoutes);
app.use('/api/cart', cartApiRouter);


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

  app.listen(3000,() => {
    console.log('servidor iniciado en: http://localhost:3000')
  });

module.exports = app;
