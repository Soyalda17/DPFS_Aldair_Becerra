module.exports = function(sequelize, DataTypes) {
  let alias = 'Product';

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: {  
      type: DataTypes.STRING,  
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', 
        key: 'id' 
      }
    }
  };

  let config = {
    tableName: 'products',
    timestamps: true,
    underscored: true 
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id'
    });
  };
  
  

  return Product;
};
