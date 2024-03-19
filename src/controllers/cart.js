import db from "../models/index.js";

export const postCartPage = async (req, res) => {
  try {
    const productId = req.body.productId;
    let newQuantity = 1;
    let fetchedCart;

    let cart = await req.user.getCart();

    if (!cart) {
      cart = await req.user.createCart();
    }

    fetchedCart = cart;

    const products = await cart.getProducts({ where: { id: productId } });

    if (products.length) {
      newQuantity = products[0].cartItem.quantity + 1;
      return products[0];
    }

    const product = await db.Product.findByPk(productId);
    await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });

    res.json({message: "redirect to /cart"});
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCartPage = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    let cartProducts = null;
    let totalPrice = 0;

    if (cart) {
      cartProducts = await cart.getProducts();
      if (cartProducts) {
        for (let product of cartProducts) {
          totalPrice += +product.cartItem.quantity * +product.price;
        }
      }
    }

    const viewsData = {
      pageTitle: "Cart Details",
      cartProducts,
      totalPrice,
    };
     res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const productId = req.body.productId;
    let fetchedCart;

    const cart = await req.user.getCart();
    fetchedCart = cart;

    const product = await db.Product.findByPk(productId);
    await fetchedCart.removeProduct(product);

     res.json({ message: "redirect to /cart" });
  } catch (error) {
    res.status(500).json(error);
  }
};
