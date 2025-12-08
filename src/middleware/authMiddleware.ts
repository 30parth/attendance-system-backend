import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ authenticated: false, message: "No token provided" });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded: any = jwt.verify(token, secret);
    req.username = decoded.name;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ authenticated: false, message: "Invalid token" });
  }
};
