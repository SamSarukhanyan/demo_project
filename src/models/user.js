const User = (sequelize, DataTypes) => {
  const model = sequelize.define("user", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  model.associate = (models) => {
    models.User.hasMany(models.Category);
    models.User.hasMany(models.Product);
    models.User.hasOne(models.Cart);
    models.User.hasMany(models.Order);
  };

  return model;
};

export default User;
