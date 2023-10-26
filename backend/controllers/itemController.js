import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createItem = async (req, res) => {
  const { name, note, imageUrl, categoryId } = req.body;
  try {
    const item = await prisma.item.create({
      data: {
        name: `${name}`,
        note: `${note}` || null,
        imageUrl: `${imageUrl}` || null,
        categoryId: `${categoryId}`,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    if (error.code == "P2002") {
      res.status(409).json({
        status: 409,
        message: `Item with name ${name} already exist`,
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
export const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: {
        category: true,
      },
    });
    res.json(items);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const patchItem = async (req, res) => {
  const { name, note, imageUrl, categoryId } = req.body;
  const { id } = req.params;

  try {
    const item = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        note: note,
        imageUrl: imageUrl,
        categoryId: categoryId,
      },
    });
    res.status(200).json(item);
  } catch (error) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Item with id ${id} does not exist`,
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
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json();
  } catch (error) {
    if (error.code == "P2025") {
      res.status(404).json({
        status: 404,
        message: `Item ${id} does not exist`,
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
