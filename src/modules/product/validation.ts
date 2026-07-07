import { Document } from "mongoose";
import z from "zod";

export const createProductValidation = z.object({
  name: z.string().trim().min(3, { message: "Product name is required" }),
  image: z.url().trim(),
  sku: z.string().trim().min(3, { message: "Product name is required" }),
  purchasePrice: z
    .number()
    .min(1, { message: "Product purchase price is required" }),
  sellingPrice: z
    .number()
    .min(1, { message: "Product selling price is required" }),
  stock: z.number().min(1, { message: "Product stock number is required" }),
});

export type TProduct = z.infer<typeof createProductValidation> & Document;

export const createCategory = z.object({
  name: z.string().min(3, { message: "Category name is required" }).trim(),
  isActive: z.boolean().optional(),
});
export type TCategory = z.infer<typeof createCategory> & Document;
