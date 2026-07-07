import { Types } from "mongoose";
import z from "zod";

export type SaleItem = {
  product: Types.ObjectId;
  qty: number;
};

export type Sale = {
  date: Date;
  customer: Types.ObjectId;
  items: SaleItem[];
  grandTotal: number;
};

const salesValidation = z.object({
  date: z.date(),
  //   items: z.array([
  //     z.object({
  //       product: z.string(),
  //       qtn: z.string(),
  //     }),
  //   ]),
  grandTotal: z.number(),
});
