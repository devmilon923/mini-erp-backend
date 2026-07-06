import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
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
  public static async register(req: Request, res: Response) {
    const { email, password, role, image } = req.body;
    const salt = uuidv4();
    const hasPassword = bcrypt.hashSync(password, salt);
    const result = await UserModel.create({
      email,
      role,
      password: hasPassword,
    });
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
