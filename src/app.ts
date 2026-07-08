import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes";
import globalErrorHandler from "./middleware/globalError";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cookieParser());
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
connectDB();

app.use(
  cors({
    origin: [process.env.CLIENTDOMAIN || "*"],
    credentials: true,
  }),
);

app.use(router);

app.use(globalErrorHandler);
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
