const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products'); // Importa las rutas de productos
const cartRouter = require('./routes/cart');

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



app.use(session({
  secret: 'aV3ry$tr0ngAndUn1qu3S3cr3tK3y!',
  resave: false,
  saveUninitialized: true
}));



// Define las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); // Usa las rutas de productos
app.use('/cart', cartRouter);

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});


module.exports = app;
