import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = `${process.env.JWT_SECRET}`;

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Authorizing...");
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = user;
    console.log("Authorized 🔓");
    next();
  });
};
