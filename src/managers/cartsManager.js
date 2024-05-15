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
      console.log(`could not get carts`, error)
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
      console.log(`could not create cart`, error);
    }
  }

  async getCartById(cartId) {
    try {
      const myCarts = await this.getCarts();
      const desiredCart = myCarts.find((el) => el.id === cartId);

      if (desiredCart) {
        return desiredCart;
      } else {
        return null;
      }
    } catch (error) {
      console.log(`could not get cart with id: ${cartId}`, error);
    }
  }

  async addProductToCart(prodId, cartId) {
    try {
      //! check if cart and product already exist
      const selectedCart = await this.getCartById(cartId);
      const productToAdd = await productManager.getProductById(prodId);

      if (selectedCart && productToAdd) {
        //! check if cart.products already contain product
        const checkProductInCart = selectedCart.products.find((el) => {
          return el.id === productToAdd.id;
        });

        //! if not: create obj with product info push product to cart.prod
        if (!checkProductInCart) {
          const prodInfo = {
            id: productToAdd.id,
            quantity: 1,
          };

          selectedCart.products.push(prodInfo);
        } else {
          //! else add ++ to product quantity
          selectedCart.products.forEach((prod) => {
            if (prod.id === productToAdd.id) {
              prod.quantity++;
            }
          });
        }

        //! get all carts
        const myCarts = await this.getCarts();

        //! get all carts and filter out modified cart
        const myCartsmodified = myCarts.filter(
          (el) => el.id !== selectedCart.id
        );

        //! push new cart
        myCartsmodified.push(selectedCart);

        //! write file
        await fs.promises.writeFile(this.path, JSON.stringify(myCartsmodified));

        return selectedCart;
      } else {
        throw new Error(`Product or cart dont exist`);
      }
    } catch (error) {
      console.log(`could not add product (${prodId}) to cart (${cartId})`);
    }
  }
}

export default CartManager;
