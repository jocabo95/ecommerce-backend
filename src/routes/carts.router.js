import { Router, json } from "express";
import CartManager from "../managers/cartsManager.js";
import { __dirname } from "../path.js";


const router = Router();
const cartManager = new CartManager(`${__dirname}/db/carts.json`)

// CREATE CART
router.post('/', async (req,res)=>{
  try {
    res.json(await cartManager.createCart());
  } catch (error) {
    res.status(500)
  }
})

// GET PRODUCTS WITH CART ID
router.get('/:cartId', async(req,res)=>{
  try {
    const {cartId} = req.params

    let desiredCart = await cartManager.getCartById(cartId)
    console.log('desiredCart', desiredCart);
    if(desiredCart){
      res.json(desiredCart.products);
    }else{
      return null
    }
    
  } catch (error) {
    res.status(500).json({error: `could not get cart with id ${cartId}`})
  }
})

// ADD PRODUCT TO CART
router.post('/:cartId/product/:prodId', async (req,res)=>{
try {
  const {cartId} = req.params;
  const {prodId} = req.params;

  let modifiedCart = await cartManager.addProductToCart(prodId, cartId)

  res.status(200).json(modifiedCart)
} catch (error) {
  res.status(500).json({error: `could not add product (${prodId}) to cart (${cartId})`})
}
})

export default router;
