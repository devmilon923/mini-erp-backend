import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import sendResponse from "../utils/sendResponse";

export const zodValidator =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("first");
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendResponse(res, 400, {
          success: false,
          path: error.issues[0].path,
          message: error.issues.map((issue) => issue.message).join(", "),
        });
      }
      return sendResponse(res, 500, {
        success: false,
        message: "Internal Server Error",
      });
    }
  };
