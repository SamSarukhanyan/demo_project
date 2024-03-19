const Category = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "categories",
    }
  );

  model.associate = (models) => {
    models.Category.hasMany(models.Product);
    models.Category.belongsTo(models.User);
  };

  return model;
};

export default Category;

// const Category = (sequelize, DataTypes) => {
//   return sequelize.define(
//     "category",
//     {
//       id: {
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     { tableName: "categories" }
//   );

// };

// Category.associate = function(models) {
//   console.log(models);
//   // associations can be defined here
//   Category.hasMany(models.product, {
//     foreignKey: 'userId',
//   })
// };

// export default Category;
