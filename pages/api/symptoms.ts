import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
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
