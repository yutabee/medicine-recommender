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
    <div>
      {products?.map((product: Product) => (
        <div key={product.id}>
          {/* <Image
            width={500}
            height={500}
            src={product.imageUrl}
            alt={product.name}
          /> */}
          <p>{product.imageUrl}</p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};
