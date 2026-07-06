import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import globalErrorHandler from "./middleware/globalError";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENTDOMAIN || "*"],
    credentials: true,
  }),
);

app.use(router);

app.use(globalErrorHandler);
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
