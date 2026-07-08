import { Request, Response } from "express";
import { getUploadURL } from "../../utils/s3";
import sendResponse from "../../utils/sendResponse";

class MediaController {
  public static async uploadMedia(req: Request, res: Response) {
    try {
      const { fileType, fileName } = req.body;
      if (!fileType || !fileName)
        throw new Error("Invalid request: fileType and fileName are required");
      const url = await getUploadURL({ fileName, fileType });
      sendResponse({
        res,
        statusCode: 200,
        message: "Upload URL generated successfully",
        data: { url },
      });
    } catch (error) {
      sendResponse({
        res,
        statusCode: 500,
        message: "Error generating upload URL",
        data: null,
      });
    }
  }
}
export default MediaController;
