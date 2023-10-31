import { Prisma, PrismaClient } from "@prisma/client";
import { userFromAccessToken } from "../middlewares/userFromAccessToken";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET as string;

export const getUser = async (req: any, res: any) => {
  const accessToken = req.header("Authorization") as string;
  const user = (await userFromAccessToken(accessToken, jwtSecret)) as any;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
  }
};
