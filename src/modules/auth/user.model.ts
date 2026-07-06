import mongoose, { Schema } from "mongoose";
import { TRegister } from "./validation";

const userSchema = new Schema<TRegister>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<TRegister>("User", userSchema);
