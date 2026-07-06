import { ZodError } from "zod";
import sendResponse from "../utils/sendResponse";

export default function globalErrorHandler(
  err: any,
  req: any,
  res: any,
  next: any,
) {
  if (err) {
    if (err instanceof ZodError) {
      const statusCode = 400;
      const message = "Input validation error";
      return sendResponse({
        res,
        statusCode,
        message,
        data: { path: err.issues[0].path },
      });
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return sendResponse({
      res,
      statusCode,
      message,
      data: {
        success: false,
        message,
      },
    });
  }
  return next();
}
