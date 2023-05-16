import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const symptoms = await prisma.symptom.findMany({
    include: {
      products: {
        select: {
          product: true,
        },
      },
    },
  });

  res.json(symptoms);
}
