import db from "../models/index.js";

export const getHomePage = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [{ model: db.Category }, { model: db.User }],
    });
    const viewsData = {
      admin: false,
      products,
      pageTitle: "Home Page - Products List",
    };
    res.json(viewsData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductDetailsPage = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await db.Product.findAll({
      where: { id: productId },
      include: { model: Category },
    });
    const viewsData = {
      product: product[0],
      pageTitle: product[0].title,
    };
    res.json(viewsData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const  getFilteredProductsPage = async (req, res) => {

  const products = await db.Product.findAll({ attributes: ["title"], where: { categoryId: 2 }, include: { model: db.Category } })
    try {
      products.forEach((elem) => {
         console.log(elem.toJSON());
       })
    } catch (error) {
      res.status(500).json(error);
    }
 }