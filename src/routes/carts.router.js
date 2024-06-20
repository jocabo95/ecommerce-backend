import { Router, json } from "express";

import * as controller from '../controllers/cart.controller.js'


const router = Router();

// CREATE CART
router.post('/', controller.create)

// GET PRODUCTS WITH CART ID
router.get('/:cartId', controller.getCartById)

// ADD PRODUCT TO CART
router.post('/:cartId/product/:prodId', controller.addProdToCart)

// UPDATE CART
router.put('/:cartId', controller.updateCart)

// DELETE PRODUCT FROM CART
router.delete("/:cartId/products/:prodId", controller.removeProdFromCart);

// UPDATE QUANTITY
router.put("/:cartId/products/:prodId", controller.updateQuantity);

// DELETE CART
router.delete("/:cartId", controller.clearCart)

export default router;
