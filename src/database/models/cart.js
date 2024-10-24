module.exports = function(sequelize, DataTypes){

  let alias = 'Cart';  

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,  
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  };

  let config = {
    tableName: 'cart',
    timestamps: true, 
    underscored: true, 
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
