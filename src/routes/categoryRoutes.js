import express from 'express';

import { getAddCategoryPage, getCategoryPage, postAddCategoryPage } from '../controllers/admin/category.js'

const router = express.Router();

router.get('/', getCategoryPage)

router.get('/add', getAddCategoryPage)
router.post('/add', postAddCategoryPage)

export default router;