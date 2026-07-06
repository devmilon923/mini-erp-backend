import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../../utils/jwt";
class AuthController {
  public static async login(req: Request, res: Response) {
    const { email, password, role } = req.body;
    const user = await UserModel.findOne({ email, role });
    if (!user) {
      return sendResponse({
        res,
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
        data: null,
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return sendResponse({
        res,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid password",
        data: null,
      });
    }
    const accessToken = generateToken({
      id: user._id.toString(),
      role: user.role,
    });
    res.cookie("at", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 1 * 60 * 60 * 1000, // 1 days
    });

    return sendResponse({
      res,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: user,
    });
  }
  public static async register(req: Request, res: Response) {
    const { email, password, role, image, name } = req.body;

    const hasPassword = bcrypt.hashSync(password, 10);
    const result = await UserModel.create({
      email,
      name,
      role,
      image,
      password: hasPassword,
    });
    return sendResponse({
      res,
      statusCode: httpStatus.OK,
      message: "Registion successful",
      data: result,
    });
  }
  public static async logout(req: Request, res: Response) {
    res.clearCookie("at");
    return sendResponse({
      res,
      statusCode: httpStatus.OK,
      message: "Logout successful",
      data: null,
    });
  }
}
export default AuthController;
