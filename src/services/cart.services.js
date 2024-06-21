import CartDaoMongoDb from "../dao/mongodb/cart.dao.js";
import ProductDaoMongoDb from '../dao/mongodb/product.dao.js'

const cartDao = new CartDaoMongoDb()
const prodDao = new ProductDaoMongoDb()

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const create = async()=>{
  try {
    return await cartDao.create()
  } catch (error) {
    console.log(error);
  }
}

export const getCartById = async (id) => {
  try {
    return await cartDao.getCartById(id);
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async(id, obj)=>{
  try {
    const updatedCart = await cartDao.update(id, obj)
    return updatedCart
  } catch (error) {
    console.log(error);
  }
}

export const removeCart = async(id)=>{
  try {
   return await cartDao.removeCart(id)
  } catch (error) {
    console.log(error);
  }
}

export const addProdToCart = async (cartId, prodId) => {
  try {

    // check that cart already exists
    const existCart = await getCartById(cartId);
    if (!existCart) return null;

    // check that product exists in db
    const checkProdInDb = await prodDao.getProductById(prodId)
    if(!checkProdInDb) return null

    return await cartDao.addProdToCart(cartId, prodId);
  } catch (error) {
    console.log(error);
  }
}

export const removeProdFromCart = async (cartId, prodId) => {
  try {
    // check that cart exists
    const checkCart = await cartDao.getCartById(cartId)
    if(!checkCart) return null
    
    // check prod exists in cart
    const checkProduct = await cartDao.searchProductinCart(cartId, prodId)
    if(!checkProduct) return null

    return await cartDao.removeProdFromCart(cartId, prodId);

  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (cartId, prodId, quantity) => {
  try {
    // check that cart exists
    const checkCart = await cartDao.getCartById(cartId);
    if (!checkCart) return null;

    // check prod exists in cart
    const checkProduct = await cartDao.searchProductinCart(cartId, prodId);
    if (!checkProduct) return null;

    return await cartDao.updateQuantity(cartId, prodId, quantity);
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async(cartId) =>{
  try {
    // check that cart exists
    const checkCart = await cartDao.getCartById(cartId);
    if (!checkCart) return null;

    return await cartDao.clearCart(cartId)
  } catch (error) {
    console.log(error);
  }
}