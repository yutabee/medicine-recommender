import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prismaClient";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  userId?: string; // Make userId optional
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: CustomSession | null = await getSession({ req });

  if (!session || !session.userId) {
    // Check if session exists and session.userId is defined
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userId = session.userId;

  if (req.method === "GET") {
    const favorites = await prisma.userProductFavorite.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    return res.json(favorites.map((favorite) => favorite.product));
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
