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
      type: DataTypes.STRING,  // Campo para almacenar el nombre del archivo de imagen
      allowNull: true
  },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW  // Esto asegura que se cree automáticamente la fecha de creación
    }
  };

  let config = {
    tableName: 'users',
    timestamps: true,  // Mantener `created_at`
    updatedAt: false,  // Deshabilitar `updated_at`
    underscored: true  // Usar `created_at` con guiones bajos
  };

  const User = sequelize.define(alias, cols, config);

  return User;
};
