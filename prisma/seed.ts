const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const headacheMed = await prisma.product.create({
    data: {
      amazonId: "B00006B18R",
      name: "Tylenol Extra Strength Rapid Release Gels",
      description: "Pain reliever and fever reducer.",
      imageUrl: "https://amazon.com/tylenol-image.jpg",
    },
  });

  const coughMed = await prisma.product.create({
    data: {
      amazonId: "B000052XH9",
      name: "Delsym 12 Hour Cough Relief",
      description: "Controls & suppresses cough for 12 hours.",
      imageUrl: "https://amazon.com/delsym-image.jpg",
    },
  });

  const headache = await prisma.symptom.create({
    data: {
      name: "Headache",
      description: "Pain in the head.",
      products: {
        create: {
          productId: headacheMed.id,
        },
      },
    },
  });

  const cough = await prisma.symptom.create({
    data: {
      name: "Cough",
      description:
        "A sudden, forceful hacking sound to release air and clear an irritation in the throat or airway.",
      products: {
        create: {
          productId: coughMed.id,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
