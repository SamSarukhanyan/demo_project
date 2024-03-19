import express from 'express';
import { getHomePage, getProductDetailsPage } from '../controllers/home.js';
import { deleteCartItem, getCartPage, postCartPage } from '../controllers/cart.js';
import { getOrdersPage, postOrderPage } from '../controllers/order.js'

const router = express.Router();

router.get("/", getHomePage);
// router.get('/filtered', getFilteredProductsPage)
router.get('/product/details/:productId', getProductDetailsPage)

router.post('/cart', postCartPage);
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem)
router.post('/order', postOrderPage)
router.get('/orders', getOrdersPage)

export default router;