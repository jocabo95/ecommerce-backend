import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDb {
  async getAll() {
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async create() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      console.log(error);
    }
  }

  async removeCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      return await CartModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async searchProductinCart(cartId, prodId) {
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      const prodInCart = await this.searchProductinCart(cartId, prodId);

      // if product already exists in cart or if it does not
      if (prodInCart) {
        return await CartModel.findOneAndUpdate(
          { _id: cartId, "products.product": prodId },
          {
            $set: {
              "products.$.quantity": prodInCart.products[0].quantity + 1,
            },
          },
          { new: true }
        );
      } else {
        return await CartModel.findOneAndUpdate(
          { _id: cartId },
          { $push: { products: { product: prodId } } },
          { new: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdFromCart(cartId, prodId) {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantity(cartId, prodId, quantity) {
    try {
       return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { "products.$.quantity": quantity } },
        {new: true}
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId){
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { products: [] } },
        {new: true}
      );
    } catch (error) {
      console.log(error);
    }
  }
}
