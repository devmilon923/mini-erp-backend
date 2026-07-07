import mongoose, { Schema } from "mongoose";
import { TRegister } from "./validation";

const userSchema = new Schema<TRegister>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, default: "" },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true,
    },
    image: { type: String, required: true, trim: true },
    totalPurchases: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<TRegister>("User", userSchema);
