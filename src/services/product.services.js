import ProductDaoMongoDb from "../dao/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDb()

export const getAll = async(pgae, limit, title, sort, category)=>{
  try {
    return await productDao.getAll(pgae, limit, title, sort, category);
  } catch (error) {
    console.log(error);
  }
}