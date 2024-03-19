const Cart = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { tableName: "cart" }
  );

  model.associate = (models) => {
    models.Cart.belongsTo(models.User);
    models.Cart.belongsToMany(models.Product, { through: models.CartItem });
  };
  return model;
};

export default Cart;
