import { prisma } from "@/libs/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, productId } = req.body;

  try {
    await prisma.userProductFavorite.delete({
      where: { userId_productId: { userId, productId } },
    });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Unable to remove from favorites" });
  }
}
