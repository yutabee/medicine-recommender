import Image from "next/image";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useFavorites } from "@/hooks/useFavorites";
import { Product } from "@prisma/client";
import { FavoriteButton } from "./FavoriteButton";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface CustomSession extends Session {
  userId: string;
}

export const FavoritesList: FC = () => {
  const { favorites, isLoading, isError } = useFavorites();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading || status === "loading") return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!session) {
    return null; // Or some fallback UI here
  }

  const customSession = session as CustomSession;

  return (
    <div className="flex flex-wrap justify-center">
      {favorites?.map((product: Product) => (
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
