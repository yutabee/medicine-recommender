const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const productsData = [
    {
      amazonId: "B00006B18R",
      name: "Tylenol Extra Strength Rapid Release Gels",
      description: "Pain reliever and fever reducer.",
      imageUrl: "https://amazon.com/tylenol-image.jpg",
      symptom: {
        name: "Headache",
        description: "Pain in the head.",
      },
    },
    {
      amazonId: "B000052XH9",
      name: "Delsym 12 Hour Cough Relief",
      description: "Controls & suppresses cough for 12 hours.",
      imageUrl: "https://amazon.com/delsym-image.jpg",
      symptom: {
        name: "Cough",
        description:
          "A sudden, forceful hacking sound to release air and clear an irritation in the throat or airway.",
      },
    },
    {
      amazonId: "B000ABC123",
      name: "Product A",
      description: "Description of Product A.",
      imageUrl: "https://amazon.com/product-a-image.jpg",
      symptom: {
        name: "Symptom A",
        description: "Description of Symptom A.",
      },
    },
    {
      amazonId: "B000DEF456",
      name: "Product B",
      description: "Description of Product B.",
      imageUrl: "https://amazon.com/product-b-image.jpg",
      symptom: {
        name: "Symptom B",
        description: "Description of Symptom B.",
      },
    },
    // Add more productData objects here...
    {
      amazonId: "B000XYZ789",
      name: "Product X",
      description: "Description of Product X.",
      imageUrl: "https://amazon.com/product-x-image.jpg",
      symptom: {
        name: "Symptom X",
        description: "Description of Symptom X.",
      },
    },
    {
      amazonId: "B000PQR987",
      name: "Product Y",
      description: "Description of Product Y.",
      imageUrl: "https://amazon.com/product-y-image.jpg",
      symptom: {
        name: "Symptom Y",
        description: "Description of Symptom Y.",
      },
    },
  ];

  for (const productData of productsData) {
    const product = await prisma.product.create({
      data: {
        amazonId: productData.amazonId,
        name: productData.name,
        description: productData.description,
        imageUrl: productData.imageUrl,
      },
    });

    await prisma.symptom.create({
      data: {
        name: productData.symptom.name,
        description: productData.symptom.description,
        products: {
          create: {
            productId: product.id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
