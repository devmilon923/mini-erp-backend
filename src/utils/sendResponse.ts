import { Response } from "express";

export default function sendResponse(
  res: Response,
  statusCode: number,
  data: any,
) {
  res.status(statusCode).json({
    success: true,
    data,
  });
}
