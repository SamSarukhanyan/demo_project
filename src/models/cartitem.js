const CartItem = (sequelize, DataTypes) => {
   return sequelize.define("cartItem", {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true,
       },
       quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
       },
   });
 };
 
 export default CartItem;
 