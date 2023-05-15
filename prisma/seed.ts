const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const productsData = [
    {
      amazonId: "B00006B18R",
      name: "ロキソニンS",
      description: "痛みを和らげ、熱を下げます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "頭痛",
        description: "頭が痛い状態。",
      },
    },
    {
      amazonId: "B000052XH9",
      name: "パブロン",
      description: "咳を12時間抑えます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "咳",
        description: "喉や気道の刺激をクリアにするための強力なハッキング音。",
      },
    },
    {
      amazonId: "B000ABC123",
      name: "商品A",
      description: "商品Aの説明。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "症状A",
        description: "症状Aの説明。",
      },
    },
    {
      amazonId: "B000DEF456",
      name: "商品B",
      description: "商品Bの説明。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "症状B",
        description: "症状Bの説明。",
      },
    },
    // 他のproductDataオブジェクトをここに追加...
    {
      amazonId: "B000XYZ789",
      name: "商品X",
      description: "商品Xの説明。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "症状X",
        description: "症状Xの説明。",
      },
    },
    {
      amazonId: "B000PQR987",
      name: "商品Y",
      description: "商品Yの説明。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "症状Y",
        description: "症状Yの説明。",
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
