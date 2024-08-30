var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productDetailsRouter = require('./routes/productDetails');
var cartRouter = require('./routes/cart'); // Importa la ruta del carrito
var productsRouter = require('./routes/products'); //importa la ruta de los productos
var dashboardRouter = require('./routes/dashboard');
var usersController = require('./controllers/usersController'); // Ajusta la ruta según tu estructura de carpetas
const db = require('./db'); // Asegúrate de que la conexión a la base de datos esté funcionando correctamente
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(methodOverride('_method'));






app.use(session({
  secret: 'tu_secreto', // Cambia 'tu_secreto' por una cadena segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a true si usas HTTPS
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/products/productDetails', productDetailsRouter); // Define la ruta para los detalles de productos
app.use('/products/cart', cartRouter); // Define la ruta base para el carrito
app.use('/products/dashboard', dashboardRouter);
app.use(methodOverride('_method'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
