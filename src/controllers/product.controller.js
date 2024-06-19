import * as services from '../services/product.services.js'

export const getAll =async(req, res)=>{
  try {

    const { page, limit, title, sort } = req.query;
    const productList = await services.getAll(page, limit, title, sort)

    // pagination links
    const nextLink = productList.hasNextPage ? `http://localhost:8080/products?page=${productList.nextPage}` : null;
    const prevLink = productList.hasNextPage ? `http://localhost:8080/products?page=${productList.prevPage}` : null;
    
    res.status(200).json({
      status: 'success',
      payload: productList.docs,
      totalPages: productList.totalDocs,
      prevPage: productList.prevPage,
      nextPage: productList.nextPage,
      page: page,
      hasNextPage: productList.hasNextPage,
      hasPrevPage: productList.hasPrevPage,
      prevLink,
      nextLink
    });

  } catch (error) {
    console.log(error);
  }

  
}