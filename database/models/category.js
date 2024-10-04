module.exports = (sequelize, DataTypes) => {

  let alias = 'Category';

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  };

  let config = {
    tableName: 'categories', 
    timestamps: false,  // Si usas created_at
  };

  const Category = sequelize.define(alias, cols, config);

  return Category;
};
