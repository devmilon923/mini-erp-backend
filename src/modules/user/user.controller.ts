import { Request, Response } from "express";
import { JwtUser, verJwtUserToken } from "../../utils/jwt";
import httpStatus from "http-status";
import { UserModel } from "../auth/user.model";
class UserController {
  public static async getProfile(req: Request, res: Response) {
    const decode = verJwtUserToken(req.cookies.at || "") as JwtUser;
    const user = await UserModel.findById(decode.id).select("-password");
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
        data: null,
      });
    }

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: user,
    });
  }
}

export default UserController;
