import { Router, json } from "express";

import * as controller from '../controllers/cart.controller.js'


const router = Router();

// CREATE CART
router.post('/', controller.create)

// GET PRODUCTS WITH CART ID
router.get('/:cartId', controller.getCartById)

// ADD PRODUCT TO CART
router.post('/:cartId/product/:prodId', controller.addProdToCart)

export default router;
