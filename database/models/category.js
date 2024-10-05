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
    timestamps: false,  // Si no usas created_at o updated_at
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id'
    });
  };
  
  

  return Category;
};
