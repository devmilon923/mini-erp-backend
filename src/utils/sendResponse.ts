import { Response } from "express";

export default function sendResponse({
  res,
  statusCode,
  message,
  data,
  pagination,
}: {
  res: Response;
  statusCode: number;
  message: string;
  data: any;
  pagination?: {
    totalPage: number;
    currentPage: number;
    prevPage: number;
    nextPage: number;
    totalData: number;
  };
}) {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    pagination,
  });
}
