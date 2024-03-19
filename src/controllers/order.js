import db from "../models/index.js";

export const postOrderPage = async (req, res) => {
  try {
    let productsObj;
    let fetchedCart;

    const cart = await req.user.getCart();
    fetchedCart = cart;

    const products = await cart.getProducts();
    productsObj = products;

    const order = await req.user.createOrder();

    let productsData = productsObj.map((product) => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    });

    await order.addProducts(productsData);
    await fetchedCart.setProducts(null);

    res.json({ message: "redirect to /orders" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrdersPage = async (req, res) => {
  try {
   const orders = await req.user.getOrders({ include: db.Product })
   const viewsData = {
      orders,
      pageTitle: "Order Details",
    };
    res.json(viewsData);
  } catch (error) {
   res.status(500).json(error);
  }
 };