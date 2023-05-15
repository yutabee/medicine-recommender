import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { symptomId } = req.query;

  const products = await prisma.product.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: Number(symptomId),
        },
      },
    },
    include: {
      symptoms: {
        select: {
          symptom: true,
        },
      },
    },
  });

  res.json(products);
}
