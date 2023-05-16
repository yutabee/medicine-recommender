import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getSymptomId(symptomName: string) {
  const symptom = await prisma.symptom.findFirst({
    where: { name: symptomName },
  });
  return symptom?.id;
}
