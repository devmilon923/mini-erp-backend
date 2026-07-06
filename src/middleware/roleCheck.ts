import { NextFunction, Request, Response } from "express";
import { JwtUser, verJwtUserToken } from "../utils/jwt";

const roleCheck = (roles: ("admin" | "manager" | "employee")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = verJwtUserToken(
      req.headers.authorization?.split(" ")[1] || "",
      process.env.JWT_SECRET || "",
    ) as JwtUser;
    const userRole = user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default roleCheck;
