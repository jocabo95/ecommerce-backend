import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDb {
  async getAll(page = 1, limit = 10, title, sort, category) {
    try {
      // determine if prods will be filtered by title/category in paginate
      const filterByTitle = title ? { title: title } : {};
      const filterByCategory = category ? { category: category } : {};

      const filter = { ...filterByTitle, ...filterByCategory };

      let sortOrder = {};

      // determine if sort will be asc or desc
      if (sort) {
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      }

      return await ProductModel.paginate(filter, {
        page,
        limit,
        sort: sortOrder,
      });
    } catch (error) {
      console.log("getProducts()= couldnt get products", error);
    }
  }

  async create(productInfo) {
    try {
      // check if product already exists using title
      const checkProduct = await ProductModel.findOne({
        title: productInfo.title,
      });

      if (!checkProduct) {
        return await ProductModel.create(productInfo);
      } else {
        return null;
      }
    } catch (error) {
      console.log(`could not add product`, error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      console.log(`product with id ${id} doesnt exist`, error);
    }
  }

  async deleteProduct(prodId) {
    try {
      return await ProductModel.findByIdAndDelete(prodId);
    } catch (error) {
      console.log("could not delete product", error);
    }
  }

  async updateProduct(prodId, prodInfo) {
    try {
      return await ProductModel.findByIdAndUpdate({ _id: prodId }, prodInfo, {
        new: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
