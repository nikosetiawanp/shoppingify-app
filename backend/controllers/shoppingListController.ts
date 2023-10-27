import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// CREATE
export const createShoppingList = async (req: Request, res: Response) => {
  const { name, userId } = req.body;
  try {
    const shoppingList = await prisma.shoppingList.create({
      data: {
        name: `${name}`,
        userId: `${userId}`,
      },
    });
    res.status(201).json(shoppingList);
  } catch (error) {
    console.log(error);
  }
};

// READ
export const getAllShoppingLists = async (req: Request, res: Response) => {
  try {
    const shoppingLists = await prisma.shoppingList.findMany({
      include: {
        shoppingItems: {
          include: {
            item: true,
          },
        },
      },
    });
    res.json(shoppingLists);
  } catch (error) {
    console.log(error);
  }
};

// READ
export const getShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const shoppingList = await prisma.shoppingList.findUnique({
      where: {
        id: id,
      },
      include: {
        shoppingItems: {
          include: {
            item: true,
          },
        },
      },
    });
    res.json(shoppingList);
  } catch (error: any) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Shopping list with id ${id} does not exist`,
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

// UPDATE
export const patchShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const shoppingList = await prisma.shoppingList.update({
      where: {
        id: `${id}`,
      },
      data: {
        name: `${name}`,
        status: status,
      },
    });
    res.status(200).json(shoppingList);
  } catch (error: any) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Shopping list with id ${id} does not exist`,
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
export const deleteShoppingList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.shoppingList.delete({
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
        message: `Shopping list with id ${id} does not exist`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
};