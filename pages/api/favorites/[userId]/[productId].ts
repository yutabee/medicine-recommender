import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prismaClient";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userId, productId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const favorite = await prisma.userProductFavorite.findFirst({
          where: {
            userId: userId as string,
            productId: Number(productId),
          },
        });
        res.status(200).json({ isFavorite: !!favorite });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch favorite status" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handleRequest;
