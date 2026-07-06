import jwt from "jsonwebtoken";
export type JwtUser = {
  id: string;
  role: "admin" | "manager" | "employee";
} & jwt.JwtPayload;
const secret = process.env.JWT_SECRET || "your-secret-key";
const generateToken = (payload: JwtUser) => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};
const verJwtUserToken = (token: string) => {
  return jwt.verify(token, secret) as JwtUser;
};

export { generateToken, verJwtUserToken };
