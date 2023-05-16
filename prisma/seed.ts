const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const productsData = [
    {
      amazonId: "B00006B18R",
      name: "風邪薬A",
      description: "風邪症状を和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "風邪薬",
        description: "風邪の時に使用します。",
      },
    },
    {
      amazonId: "B000052XH9",
      name: "胃腸薬B",
      description: "胃腸の不調を改善します。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "胃腸薬",
        description: "胃腸の不調に使用します。",
      },
    },
    {
      amazonId: "B000ABC123",
      name: "痛み止めC",
      description: "痛みを和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "痛み止め",
        description: "痛い時に使用します。",
      },
    },
    {
      amazonId: "B000DEF456",
      name: "アレルギー薬D",
      description: "アレルギー症状を緩和します。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "アレルギー薬",
        description: "アレルギーの時に使用します。",
      },
    },
    {
      amazonId: "B000HIJ123",
      name: "目薬E",
      description: "目の痛みや不快感を緩和します。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "目薬",
        description: "目の不調に使用します。",
      },
    },
    {
      amazonId: "B000LMN456",
      name: "皮膚薬F",
      description: "皮膚の炎症やかゆみを和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "皮膚薬",
        description: "皮膚の不調に使用します。",
      },
    },
    {
      amazonId: "B000QRS567",
      name: "歯科用薬G",
      description: "口内の痛みや不快感を和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "歯科用薬",
        description: "口内の不調に使用します。",
      },
    },
    {
      amazonId: "B000TUV890",
      name: "鼻炎薬H",
      description: "鼻炎の症状を和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "鼻炎薬",
        description: "鼻炎の際に使用します。",
      },
    },
    {
      amazonId: "B000JKL123",
      name: "咳・喉・鼻炎薬I",
      description: "咳、喉の痛み、鼻炎の症状を和らげます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "咳・喉・鼻炎薬",
        description: "咳、喉、鼻炎の不調に使用します。",
      },
    },
    {
      amazonId: "B000XYZ456",
      name: "サプリメントJ",
      description: "体調管理と健康維持に役立ちます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "サプリメント",
        description: "健康維持に使用します。",
      },
    },
    {
      amazonId: "B000MNO789",
      name: "ビタミン・ミネラルK",
      description: "ビタミンとミネラルを補給します。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "ビタミン・ミネラル",
        description: "栄養補給に使用します。",
      },
    },
    {
      amazonId: "B000RST123",
      name: "睡眠補助薬L",
      description: "睡眠を促進します。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "睡眠補助薬",
        description: "睡眠の不足や不調に使用します。",
      },
    },
    {
      amazonId: "B000UVW456",
      name: "健康食品M",
      description: "健康維持に役立つ食品です。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "健康食品",
        description: "健康維持に使用します。",
      },
    },
    {
      amazonId: "B000XYZ789",
      name: "その他N",
      description: "特定の症状以外の健康管理に役立ちます。",
      imageUrl: "/images/loxonin.jpg",
      symptom: {
        name: "その他",
        description: "一般的な健康管理に使用します。",
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
