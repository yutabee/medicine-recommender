import { prisma } from "@/libs/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query;

  if (Array.isArray(userId)) {
    throw new Error("Invalid user id");
  }

  try {
    const favorites = await prisma.userProductFavorite.findMany({
      where: { userId },
      include: { product: true },
    });

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch favorites" });
  }
}
