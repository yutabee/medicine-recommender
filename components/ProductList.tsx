import Image from "next/image";
import { FC } from "react";
import { useProducts } from "@/hooks/useProducts";

interface ProductListProps {
  symptomId: string;
}

interface Symptom {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  amazonId: string;
  name: string;
  description: string;
  imageUrl: string;
  symptoms: {
    symptom: Symptom;
  }[];
}

export const ProductList: FC<ProductListProps> = ({ symptomId }) => {
  const { products, isLoading, isError } = useProducts(symptomId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

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
          </div>
        </div>
      ))}
    </div>
  );
};
