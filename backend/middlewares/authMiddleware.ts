import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
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
    next();
  });
};

export const checkItemOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const itemId = req.params.id;
  const userId = req.user.userId;

  await prisma.item
    .findUnique({
      where: {
        id: itemId,
      },
    })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (item.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Access denied - item ownership mismatch" });
      }
      next();
    })
    .catch((error) => {
      console.error("Error checking item ownership:", error);
      res.status(500).json({ message: "Something went wrong" });
    });
};
