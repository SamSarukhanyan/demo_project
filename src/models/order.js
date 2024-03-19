const Order = (sequelize, DataTypes) => {
  const model = sequelize.define("order", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  model.associate = (models) => {
    models.Order.belongsTo(models.User);
    models.Order.belongsToMany(models.Product, { through: models.OrderItem });
  };

  return model;
};

export default Order;
