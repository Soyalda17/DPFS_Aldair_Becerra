'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Leer y cargar todos los modelos en el directorio
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Establecer las asociaciones para todos los modelos cargados
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Cargar modelos manualmente si es necesario (en caso de que no se carguen con fs.readdirSync)
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.Cart = require('./cart')(sequelize, Sequelize.DataTypes);
db.CartItem = require('./cartItem')(sequelize, Sequelize.DataTypes);

// Establecer asociaciones manualmente si no fueron detectadas
if (db.Product.associate) {
  db.Product.associate(db);
}
if (db.Category.associate) {
  db.Category.associate(db);
}
if (db.Cart.associate) {
  db.Cart.associate(db);
}
if (db.CartItem.associate) {
  db.CartItem.associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
