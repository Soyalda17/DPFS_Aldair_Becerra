module.exports = function(sequelize, DataTypes){

  let alias = 'Cart';  // El nombre del modelo debería empezar en mayúscula según convenciones

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,  // Asegúrate de usar DataTypes (con D mayúscula)
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  };

  let config = {
    tableName: 'cart',
    timestamps: true, // Si en la tabla están los campos created_at y updated_at
    underscored: true, // Si los nombres de los campos created_at y updated_at están escritos con guión bajo
  };

  const Cart = sequelize.define(alias, cols, config);
  Cart.associate = function(models) {
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cart_id',
      as: 'items'
    });
  };
  
  return Cart;
};
