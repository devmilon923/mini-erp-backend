import mongoose from "mongoose";
import { TCategory, TProduct } from "./validation";

const productSchema = new mongoose.Schema<TProduct>(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true, trim: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);

const categorySchema = new mongoose.Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled", "draft"],
      default: "draft",
      required: true,
    },
  },
  { timestamps: true },
);
export const ProductModel = mongoose.model<TProduct>("Product", productSchema);
export const CategoryModel = mongoose.model<TCategory>(
  "Category",
  categorySchema,
);
