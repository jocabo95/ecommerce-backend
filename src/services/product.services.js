import ProductDaoMongoDb from "../dao/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDb()

export const getAll = async(pgae, limit, title, sort)=>{
  try {
    return await productDao.getAll(pgae, limit, title, sort);
  } catch (error) {
    console.log(error);
  }
}