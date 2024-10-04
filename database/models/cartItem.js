module.exports = (sequelize, DataTypes) => {

  let alias = 'CartItem';

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  };

  let config = {
    tableName: 'cart_items',  // El nombre de la tabla según tu base de datos
    timestamps: true,  // Si usas created_at y updated_at
    underscored: true,  // Para usar guiones bajos en los campos de la base de datos
  };

  const CartItem = sequelize.define(alias, cols, config);

  return CartItem;
};
