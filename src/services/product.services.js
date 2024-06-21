import ProductDaoMongoDb from "../dao/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDb();

export const getAll = async (page, limit, title, sort, category) => {
  try {
    return await productDao.getAll(page, limit, title, sort, category);
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async(prodInfo) =>{
  try {
    const newProduct = await productDao.addProduct(prodInfo)

    if(newProduct){
      return newProduct
    }else{
      return null
    }
  } catch (error) {
    console.log(error);
  }
}

export const getById = async(prodId) =>{
  try {
    const product = await productDao.getProductById(prodId)
    if(!product) return null
    else return product
  } catch (error) {
    console.log(error);
  }
}

export const removeProduct = async(prodId) =>{
  try {
    // check that product exists
    const checkForProduct = await productDao.getProductById(prodId)

    if(checkForProduct){
      return await productDao.deleteProduct(prodId)
    }else{
      return null
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateProduct = async (prodId, prodInfo) =>{
  try {
    // check that product exists
    const checkForProduct = await productDao.getProductById(prodId);

    if(checkForProduct){
      return await productDao.updateProduct(prodId, prodInfo)
    }else{
      return null
    }
  } catch (error) {
    console.log(error);
  }
}
