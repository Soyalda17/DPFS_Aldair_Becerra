module.exports = (sequelize, DataTypes) => {
  let alias = 'user'; 

  let cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15)
    },
    location: {
      type: DataTypes.STRING(100)
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  };

  let config = {
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    underscored: true
  };

  const User = sequelize.define(alias, cols, config);

  return User;
};
