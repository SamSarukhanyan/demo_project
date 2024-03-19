import db from "../../models/index.js";

export const getAddProductPage = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      attributes: ["id", "title"],
    });
    const viewsData = {
      edit: false,
      categories,
      pageTitle: "Add Product",
    };
    res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const postAddProductPage = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;

    const product = {
      title: req.body.title,
      imageUrl: req.body.image,
      price: req.body.price,
      description: req.body.description,
    };

    const categoryObj = await db.Category.findByPk(categoryId);
    const productObj = await req.user.createProduct(product);

    await productObj.setCategory(categoryObj);

    res.json({ message: "product added!  redirect to /" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAdminProductsPage = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [{ model: Category }, { model: User }],
    });
    const viewsData = {
      admin: true,
      pageTitle: "Admin Products",
      products,
    };
    res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getEditProductPage = async (req, res) => {
  try {
    const productId = req.params.productId;
    let viewsData = {
      edit: true,
      pageTitle: "Edit Product",
    };
    const product = await db.Product.findByPk(productId);
    viewsData = { ...{ product }, ...viewsData };
    const categories = await db.Category.findAll({
      attributes: ["id", "title"],
    });
    viewsData = { ...{ categories }, ...viewsData };
    res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const postEditProductPage = async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.image,
      categoryId: req.body.categoryId,
    };
    await db.Product.update(product, { where: { id: productId } });
    res.json({ message: "product updatet,  redirect to /products" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const postDeleteProductPage = async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await db.Product.findByPk(productId);
    await product.destroy();
    res.json({ message: "product deleted!, redirect to /products" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
