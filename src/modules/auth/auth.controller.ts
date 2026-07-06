import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
class AuthController {
  public static async login(req: Request, res: Response) {
    const { email, password, role } = req.body;
    // Implement your login logic here
    // For example, validate the user credentials and generate a JWT token
    return sendResponse({
      res,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: {
        email,
        role,
      },
    });
  }
}
export default AuthController;
