import { prisma } from "@/libs/prismaClient";

export async function getSymptomId(symptomName: string) {
  const symptom = await prisma.symptom.findFirst({
    where: { name: symptomName },
  });
  return symptom?.id;
}
