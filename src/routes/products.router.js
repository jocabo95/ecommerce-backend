import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { validateProduct } from "../middlewares/validateAddedProduct.js";

const router = Router();
const productManager = new ProductManager("./src/db/products.json");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    // limit refers to # of products that will be displayed in client
    const { limit } = req.query;

    const productList = await productManager.getProducts(limit);
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ error: "could not get product list" });
  }
});

// GET PRODUCT BY ID
router.get("/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await productManager.getProductById(prodId);

    // act weather product exists or not
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: `could not get product` });
  }
});

// ADD PRODUCT
router.post("/", validateProduct, async (req, res) => {
  try {
    const productInfo = req.body;
    const newProduct = await productManager.addProducts(productInfo);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `could not add product` });
  }
});

// UPDATE PRODUCT
router.put("/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;
    const newProperties = req.body;

    const updatedProduct = await productManager.updateProduct(
      prodId,
      newProperties
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `could not update product with id ${prodId}` });
  }
});

// REMOVE PRODUCT
router.delete("/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;
    const newProductList = await productManager.deleteProduct(prodId);

    if (newProductList) {
      res.status(200).json(newProductList);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `could not detele product with id ${prodId}` });
  }
});

export default router;
