import { Router } from "express";
import { validateProduct } from "../middlewares/validateAddedProduct.js";
import { __dirname } from "../path.js";
import * as controller from '../controllers/product.controller.js'

const router = Router();

// GET ALL PRODUCTS
router.get("/", controller.getAll);

// ADD PRODUCT
router.post("/", validateProduct, controller.create);

// GET PRODUCT BY ID
router.get("/:prodId", controller.getById);

// UPDATE PRODUCT
router.put("/:prodId", controller.updatedProduct);

// REMOVE PRODUCT
router.delete("/:prodId", controller.removeProduct);

export default router;
