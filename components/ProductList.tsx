import Image from "next/image";
import { FC } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@prisma/client";
import { FavoriteButton } from "./FavoriteButton";
import { useSession } from "next-auth/react";

interface ProductListProps {
  symptomId: string;
}

interface CustomSession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  userId: string;
  expires: string;
}

export const ProductList: FC<ProductListProps> = ({ symptomId }) => {
  const { products, isLoading, isError } = useProducts(symptomId);

  // NextAuthのセッションを取得
  const { data: session, status } = useSession();

  if (isLoading || status === "loading") return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  const customSession = session as unknown as CustomSession; // カスタムセッションへキャスト

  return (
    <div className="flex flex-wrap justify-center">
      {products?.map((product: Product) => (
        <div
          key={product.id}
          className="m-4 w-60 border rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            width={300}
            height={300}
            src={product.imageUrl}
            alt={product.name}
          />
          <div className="p-4 bg-slate-50">
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm">{product.description}</p>
            {session && (
              <FavoriteButton
                userId={customSession.userId}
                productId={product.id}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
