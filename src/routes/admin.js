import express from "express";
import {
  getAddProductPage,
  getAdminProductsPage,
  getEditProductPage,
  postAddProductPage,
  postDeleteProductPage,
  postEditProductPage,
} from "../controllers/admin/Product.js";

const router = express.Router();

router.get("/", getAdminProductsPage);
router.get("/add", getAddProductPage);
router.post("/add", postAddProductPage);
router.get("/edit/:productId", getEditProductPage);
router.post("/edit", postEditProductPage);
router.post("/delete", postDeleteProductPage);

export default router;
