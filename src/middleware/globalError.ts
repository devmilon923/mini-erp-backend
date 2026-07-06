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
      const message = err.issues.map((error: any) => error.message).join(", ");
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
