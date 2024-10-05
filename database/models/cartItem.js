module.exports = function(sequelize, DataTypes) {
  let alias = 'CartItem';

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'carts', // Debe hacer referencia a la tabla `carts`
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products', // Debe hacer referencia a la tabla `products`
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  };

  let config = {
    tableName: 'cart_items',  // Asegúrate de que esta sea la tabla correcta
    timestamps: false
  };

  const CartItem = sequelize.define(alias, cols, config);
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'cart_id',
      as: 'cart'
    });
  
    CartItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };
     

  return CartItem;
};
