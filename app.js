const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const indexRouter = require('./api/json/routes/index');
const usersRouter = require('./api/json/routes/users');
const productsRouter = require('./api/json/routes/products');
const isAuthenticated = require('./middlewares/auth');
const db = require('./database/models');

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
