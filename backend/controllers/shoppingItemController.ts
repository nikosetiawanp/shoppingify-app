import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// CREATE
export const createShoppingItem = async (req: Request, res: Response) => {
  const { shoppinglistId, itemId, quantity } = req.body;
  try {
    const shoppingItem = await prisma.shoppingItem.create({
      data: {
        shoppinglistId: `${shoppinglistId}`,
        itemId: `${itemId}`,
        quantity: Number(quantity) || 1,
      },
    });
    res.status(201).json(shoppingItem);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const patchShoppingItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const shoppingItem = await prisma.shoppingItem.update({
      where: {
        id: `${id}`,
      },
      data: {
        quantity: Number(quantity),
      },
    });
    res.status(200).json(shoppingItem);
  } catch (error: any) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Shopping item with id ${id} does not exist`,
      });
      console.log(error);
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
};

// DELETE
export const deleteShoppingItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.shoppingItem.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json();
  } catch (error: any) {
    console.log(error);
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Shopping item with id ${id} does not exist`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
};
