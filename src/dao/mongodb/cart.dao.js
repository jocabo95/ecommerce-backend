import { CartModel } from "./models/cart.model";

export default class CartDaoMongoDb {
  async create() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await CartModel.findById(id).populate("products.products");
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async searchProductinCart(cartId, prodId) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdFromCart (cartId, prodId) {}
}
