import { ZodError } from "zod";
import sendResponse from "../utils/sendResponse";
import { handlerDuplicateError } from "../utils/handleDuplicate";

export default function globalErrorHandler(
  err: any,
  req: any,
  res: any,
  next: any,
) {
  console.log(err.code);
  if (err) {
    if (err instanceof ZodError) {
      const statusCode = 400;
      const message =
        "Validation error: " + err.issues.map((e) => e.message).join(", ");
      return sendResponse({
        res,
        statusCode,
        message,
        data: { path: err.issues[0].path },
      });
    } else if (err.code === 11000) {
      const message = handlerDuplicateError(err);
      return sendResponse({
        res,
        statusCode: 409,
        message,
        data: null,
      });
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return sendResponse({
      res,
      statusCode,
      message,
      data: null,
    });
  }
  return next();
}
