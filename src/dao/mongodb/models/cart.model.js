import { model, Schema } from "mongoose";

const collectionName = "carts";

const cartSchema = new Schema({
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
});

export const CartModel = model(collectionName, cartSchema);
