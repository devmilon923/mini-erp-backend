import mongoose from "mongoose";
import { TCategory, TProduct } from "./validation";

const productSchema = new mongoose.Schema<TProduct>(
  {
    name: { type: String },
    sku: { type: String },
    image: { type: String },
    purchasePrice: { type: Number },
    sellingPrice: { type: Number },
    stock: { type: Number },
  },
  { timestamps: true },
);

const categorySchema = new mongoose.Schema<TCategory>(
  {
    name: { type: String, unique: true, required: true, trim: true,lowercase: true },
  },
  { timestamps: true },
);
export const ProductModel = mongoose.model<TProduct>("Product", productSchema);
export const CategoryModel = mongoose.model<TCategory>(
  "Category",
  categorySchema,
);
