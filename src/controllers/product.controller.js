import * as services from "../services/product.services.js";

export const getAll = async (req, res) => {
  try {
    const { page, limit, title, sort, category } = req.query;
    const productList = await services.getAll(
      page,
      limit,
      title,
      sort,
      category
    );

    // pagination links
    let nextLink = productList.hasNextPage
      ? `http://localhost:8080/products?page=${productList.nextPage}`
      : null;
    let prevLink = productList.hasNextPage
      ? `http://localhost:8080/products?page=${productList.prevPage}`
      : null;

    if (sort) {
      nextLink = nextLink + `&sort=${sort}`;
      prevLink = prevLink + `&sort=${sort}`;
    } else if (title) {
      nextLink = nextLink + `&title=${title}`;
      prevLink = prevLink + `&title=${title}`;
    } else if (category) {
      nextLink = nextLink + `&category=${category}`;
      prevLink = prevLink + `&category=${category}`;
    }

    res.status(200).json({
      status: "success",
      payload: productList.docs,
      totalPages: productList.totalDocs,
      prevPage: productList.prevPage,
      nextPage: productList.nextPage,
      page: page,
      hasNextPage: productList.hasNextPage,
      hasPrevPage: productList.hasPrevPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  try {
    const newProduct = await services.create(req.body)
    if(!newProduct) res.status(404).json({msg: 'couldnt create product'})
      else res.status(200).json(newProduct)
  } catch (error) {
    console.log(error);
  }
}

export const getById = async (req, res) =>{
  try {
    const {prodId} = req.params;

    const product = await services.getById(prodId)

    if(!product)res.status(404).json({msg:'product does not exist / cant be found'})
    else res.status(200).json(product)
  } catch (error) {
    console.log(error);
  }
}

export const removeProduct = async (req, res)=>{
  try {
    const {prodId} = req.params;

    const removeProduct = await services.removeProduct(prodId)

    if(!removeProduct)res.status(404).json({msg: 'could not delete product'})
    else res.status(200).json({msg: `deleted product with id ${prodId}`})
  } catch (error) {
    console.log(error);
  }
}

export const updatedProduct = async (req, res)=>{
  try {
    const {prodId} = req.params

    const updatedProduct = await services.updateProduct(prodId, req.body)
    if(!updatedProduct)res.status(500).json({msg:`could not update product`})
    else res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
}