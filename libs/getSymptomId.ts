import { prisma } from "@/pages/api/prismaClient";

export async function getSymptomId(symptomName: string) {
  const symptom = await prisma.symptom.findFirst({
    where: { name: symptomName },
  });
  return symptom?.id;
}
