import { Request, Response } from "express";
import { getUploadURL } from "../../utils/s3";
import sendResponse from "../../utils/sendResponse";
import { UploadMediaValidation } from "./validation";

class MediaController {
  public static async uploadMedia(req: Request, res: Response) {
    try {
      const { fileType, fileName } = req.body as UploadMediaValidation;
      const url = await getUploadURL({ fileName, fileType });
      return sendResponse({
        res,
        statusCode: 200,
        message: "Upload URL generated successfully",
        data: url,
      });
    } catch (error) {
      return sendResponse({
        res,
        statusCode: 500,
        message: "Error generating upload URL",
        data: null,
      });
    }
  }
}
export default MediaController;
