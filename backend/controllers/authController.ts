import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET as string;

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const roundsOfHashing = 10;
    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (error: any) {
    if (error.code == "P2002") {
      res.status(409).json({
        status: 409,
        message: `Account with email ${email} already exist`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "24h" });
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {}
};
