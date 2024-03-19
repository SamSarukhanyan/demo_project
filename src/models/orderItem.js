const OrderItem = (sequelize, DataTypes) => {
  return sequelize.define("orderItem", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
};

export default OrderItem;
