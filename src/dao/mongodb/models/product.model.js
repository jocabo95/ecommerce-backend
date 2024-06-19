import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "products";

const productSchema = new Schema({
  title: {
    type: String,
    requierd: true,
    index: true,
  },
  description: {
    type: String,
    requierd: true,
  },
  category: {
    type: String,
    requierd: true,
  },
  code: {
    type: String,
    requierd: true,
  },
  price: {
    type: Number,
    requierd: true,
  },
  stock: {
    type: Number,
    requierd: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(collectionName, productSchema);

