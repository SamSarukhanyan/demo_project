import Sequelize from 'sequelize';


const env = process.env.NODE_ENV || 'development';
import configs from '../config/config.js';

import Category from './category.js';
import Product from './products.js';
import Order from './order.js';
import User from './user.js';
import OrderItem from './orderItem.js';
import Cart from './cart.js';
import CartItem from './Cartitem.js';

const config = configs[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db[User.name] = User(sequelize, Sequelize);
db[Product.name] = Product(sequelize, Sequelize);
db[Category.name] = Category(sequelize, Sequelize);
db[Cart.name] = Cart(sequelize, Sequelize);
db[CartItem.name] = CartItem(sequelize, Sequelize);
db[Order.name] = Order(sequelize, Sequelize);
db[OrderItem.name] = OrderItem(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



export default db;
