-- CreateTable
CREATE TABLE "UserProductFavorite" (
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "UserProductFavorite_pkey" PRIMARY KEY ("userId","productId")
);

-- AddForeignKey
ALTER TABLE "UserProductFavorite" ADD CONSTRAINT "UserProductFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductFavorite" ADD CONSTRAINT "UserProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
