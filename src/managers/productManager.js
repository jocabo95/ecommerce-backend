import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        let productList = await fs.promises.readFile(this.path, "utf-8");

        // cut product list to display only limit number of products
        if (limit) {
          let limitedProductList = JSON.parse(productList).slice(0, limit);
          return limitedProductList;
        }

        return JSON.parse(productList);
      } else {
        return [];
      }
    } catch (error) {
      console.log("getProducts()= couldnt get products");
    }
  }

  async addProducts(productInfo, status = true) {
    try {
      // get products
      let productList = await this.getProducts();

      // create new product object
      let newProduct = {
        ...productInfo,
        id: uuidv4(),
        status: status,
      };

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
      console.log(`could not add product`);
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
      console.log(`product with id ${id} doesnt exist`);
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
      console.log("could not delete product");
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
      }
    } catch (error) {
      console.log(`could not modify product with id= ${id}`);
    }
  }
}

const prod1 = {
  title: "efwfwe",
  description: "reusable water bottle",
  category: "outdoors",
  code: "ndoss",
  price: 150,
  stock: 4,
};
