import ProductManager from "./productManager.js";
import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4, v4 } from "uuid";

const productManager = new ProductManager(`${__dirname}/db/products.json`);

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const myCarts = await fs.promises.readFile(this.path, "utf-8");
        console.log("getcarts ", myCarts);
        return JSON.parse(myCarts);
      } else {
        return [];
      }
    } catch (error) {
      console.log(`could not get carts`);
    }
  }

  async createCart() {
    try {
      let myCarts = await this.getCarts();

      const newCart = {
        id: uuidv4(),
        products: [],
      };

      myCarts.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(myCarts));

      return newCart;
    } catch (error) {
      console.log(`could not create cart`);
    }
  }

  async getCartById(cartId) {
    try {
      const myCarts = await this.getCarts()
      const desiredCart = myCarts.find((el)=> el.id === cartId)

      if(desiredCart){
        return desiredCart
      }else{
        return null
      }

    } catch (error) {
      console.log(`could not get cart with id: ${cartId}`);
    }
  }

  async addProductToCart(prodId, cartId) {
  }
}

export default CartManager;


