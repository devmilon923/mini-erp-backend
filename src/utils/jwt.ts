import jwt from "jsonwebtoken";
export type JwtUser = {
  id: string;
  role: "admin" | "manager" | "employee";
} & jwt.JwtPayload;
const generateToken = (payload: JwtUser, secret: string) => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};
const verJwtUserToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtUser;
};

export { generateToken, verJwtUserToken };
