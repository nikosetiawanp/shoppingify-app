import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { userFromAccessToken } from "../middlewares/userFromAccessToken";

const prisma = new PrismaClient();
const jwtSecret = `${process.env.JWT_SECRET}`;

// CREATE
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name: `${name}`,
      } as Prisma.CategoryCreateInput,
    });
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code == "P2002") {
      res.status(409).json({
        status: 409,
        message: `Category with name ${name} already exist`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
};

// READ
export const getAllCategories = async (req: Request, res: Response) => {
  const accessToken = req.header("Authorization") as string;
  const user = (await userFromAccessToken(accessToken, jwtSecret)) as any;

  try {
    const categories = await prisma.category.findMany({
      where: {
        userId: {
          in: ["shoppingify", user.id],
        },
      },
      include: {
        items: true,
      },
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
// export const patchCategory = async (req, res) => {
//   const { name, note, imageUrl, categoryId } = req.body;
//   const { id } = req.params;

//   try {
//     const item = await prisma.item.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: name,
//         note: note,
//         imageUrl: imageUrl,
//         categoryId: categoryId,
//       },
//     });
//     res.status(200).json(item);
//   } catch (error) {
//     if (error.code == "P2025") {
//       res.status(404).json({
//         status: 404,
//         message: `Item ${id} does not exist`,
//       });
//       console.log(error);
//     } else {
//       res.status(500).json({
//         status: 500,
//         message: "Something went wrong",
//       });
//     }
//   }
// };

// DELETE
export const deleteCategory = async (req: Request, res: Response) => {
  const accessToken = req.header("Authorization") as string;
  const user = (await userFromAccessToken(accessToken, jwtSecret)) as any;

  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json();
  } catch (error: any) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Category with id ${id} does not exist`,
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
