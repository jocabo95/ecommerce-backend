import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDb {
  async getAll(page = 1, limit=10, title, sort) {
    try {

      // determine if filter will be done in paginate
      const filter = title ? { title: title } : {};

      let sortOrder = {};

      // determine if sort will be sac or desc
      if (sort) {
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      }

      const productList = await ProductModel.paginate(filter, {
        page,
        limit,
        sort:  sortOrder ,
      });
      
      return productList;
    } catch (error) {
      console.log("getProducts()= couldnt get products", error);
    }
  }

  async addProducts(productInfo) {
    try {
      // create new product
      let newProduct = await productsModel.create(productInfo);

      // check new product does not exist
      const checkProductExistance = productList.find(
        (el) => el.title === newProduct.title
      );

      // if doesnt exist, push to product list
      if (!checkProductExistance) {
        productList.push(newProduct);

        // write new product list in path
        await fs.promises.writeFile(this.path, JSON.stringify(productList));

        return newProduct;
      } else {
        console.log("product title already exists");
      }
    } catch (error) {
      console.log(`could not add product`, error);
    }
  }

  async getProductById(id) {
    try {
      const productList = await this.getProducts();
      const desiredProduct = productList.find((el) => el.id === id);

      if (desiredProduct) {
        return desiredProduct;
      } else {
        return null;
      }
    } catch (error) {
      console.log(`product with id ${id} doesnt exist`, error);
    }
  }

  async deleteProduct(id) {
    try {
      const productList = await this.getProducts();
      const productToDelete = await this.getProductById(id);

      // if product exists, delete
      if (productToDelete) {
        const newProductList = productList.filter((el) => el.id !== id);

        await fs.promises.writeFile(this.path, JSON.stringify(newProductList));
        return newProductList;
      } else {
        return null;
      }
    } catch (error) {
      console.log("could not delete product", error);
    }
  }

  async updateProduct(id, newProperties) {
    try {
      const productList = await this.getProducts();
      const productToEdit = await this.getProductById(id);

      if (productToEdit) {
        //modify product
        let modifiedProduct = {
          ...productToEdit,
          ...newProperties,
        };

        // delete desired product from prod list
        // modify only product /vs/ modify one of several products
        let filteredProductList;
        if (productList.length === 1) {
          filteredProductList = [];
        } else {
          filteredProductList = productList.filter((el) => el.id !== id);
        }

        // update product list with new version
        filteredProductList.push(modifiedProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(filteredProductList)
        );
        return filteredProductList;
      } else {
        console.log(
          `product with id ${id} cant be edited because it does not exist`
        );
        return null;
      }
    } catch (error) {
      console.log(`could not modify product with id= ${id}`, error);
    }
  }
}
