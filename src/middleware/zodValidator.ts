import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import sendResponse from "../utils/sendResponse";

export const zodValidator =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendResponse({
          res,
          statusCode: 400,
          message: "Validation error: " + error.issues.map((e) => e.message).join(", "),
          data: {
            path: error.issues[0].path,
          },
        });
      }
      return sendResponse({
        res,
        statusCode: 500,
        message: "Internal Server Error",
        data: {
          success: false,
          message: "Internal Server Error",
        },
      });
    }
  };
