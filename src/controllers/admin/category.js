import db from "../../models/index.js";

export const getCategoryPage = async (req, res) => {
  try {
    const categories = await db.Category.findAll({ include: db.User });
    const viewsData = {
      pageTitle: "Categories List",
      categories,
    };
     res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAddCategoryPage = (req, res) => {
  try {
    const viewsData = {
      pageTitle: "Add Category",
    };
     res.json(viewsData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const postAddCategoryPage = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    await req.user.createCategory({ title, description });
     res.json({ message: "redirect to /categories" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
