import CartDaoMongoDb from "../dao/mongodb/cart.dao.js";
import ProductDaoMongoDb from '../dao/mongodb/product.dao.js'

const cartDao = new CartDaoMongoDb()
const prodDao = new ProductDaoMongoDb()

export const create = async()=>{
  try {
    return await cartDao.create()
  } catch (error) {
    console.log(error);
  }
}

export const getAll = async()=>{
  try {
    return await cartDao.getAll()
  } catch (error) {
    console.log(error);
  }
}

export const getCartById = async (id) => {
  try {
    return await cartDao.getById(id);
  } catch (error) {
    console.log(error);
  }
};

export const removeCart = async(id)=>{
  try {
   return await cartDao.removeCart(id)
  } catch (error) {
    console.log(error);
  }
}

export const addProdToCart = async (cartId, prodId) => {
  try {
    const existCart = await getCartById(cartId);
    if (!existCart) return null;

    const existProd = await prodDao.getProductById(prodId);
    if (!existProd) return null;

    return await cartDao.addProdToCart(cartId, prodId);
  } catch (error) {
    console.log(error);
  }
}