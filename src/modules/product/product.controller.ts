import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProductModel } from "./product.model";
import paginationBuilder from "../../utils/pagination";

class ProductController {
  public static async createProduct(req: Request, res: Response) {
    try {
      const result = await ProductModel.create(req.body);
      sendResponse({
        res,
        statusCode: 201,
        message: "Product created successfully",
        data: result,
      });
    } catch (error) {
      sendResponse({
        res,
        statusCode: 500,
        message: "Error creating product",
        data: null,
      });
    }
  }
  public static async getAllProducts(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const products = await ProductModel.find()
        .skip(skip)
        .limit(Number(limit));
      const totalData = await ProductModel.countDocuments();
      const pagination = paginationBuilder({
        totalData,
        currentPage: Number(page),
        limit: Number(limit),
      });
      return sendResponse({
        res,
        statusCode: 200,
        message: "Products retrieved successfully",
        data: products,
        pagination,
      });
    } catch (error) {
      sendResponse({
        res,
        statusCode: 500,
        message: "Error retrieving products",
        data: null,
      });
    }
  }
}
export default ProductController;
