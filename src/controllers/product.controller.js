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
