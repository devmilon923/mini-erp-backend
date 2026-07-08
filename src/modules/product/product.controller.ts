import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProductModel } from "./product.model";

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
}
export default ProductController;
