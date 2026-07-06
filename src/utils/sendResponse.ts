import { Response } from "express";

export default function sendResponse({
  res,
  statusCode,
  message,
  data,
}: {
  res: Response;
  statusCode: number;
  message: string;
  data: any;
}) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}
