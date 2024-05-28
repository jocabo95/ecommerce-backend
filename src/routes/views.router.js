import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../path.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`)
const router = Router()


router.get('/products', async(req, res)=>{
  try {
    const { limit } = req.query;

    const productList = await productManager.getProducts(limit);

    res.render("index", { productList });
  } catch (error) {
    res.status(500)
  }
})

// SHOW PRODUCTS REALTIME
router.get("/realtimeProducts", async (req, res) => {
  try {

    res.render('realtimeProducts');
  } catch (error) {
    res.status(500).json({ error: "could not get product list" });
  }
});


export default router