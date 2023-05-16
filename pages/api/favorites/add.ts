import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, productId } = req.body;

  try {
    await prisma.userProductFavorite.create({
      data: {
        userId,
        productId,
      },
    });

    res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ error: "Unable to add to favorites" });
  }
}
