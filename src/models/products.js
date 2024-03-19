const Product = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "products",
    }
  );

  model.associate = (models) => {
    models.Product.belongsTo(models.Category);
    models.Product.belongsTo(models.User);
    models.Product.belongsToMany(models.Cart, { through: models.CartItem });
    models.Product.belongsToMany(models.Order, { through: models.OrderItem });
  };

  return model;
};

export default Product;
