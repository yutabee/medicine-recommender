import Image from "next/image";
import { useEffect, useState, FC } from "react";

interface Product {
  id: number;
  amazonId: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface ProductListProps {
  symptomId: string;
}

export const ProductList: FC<ProductListProps> = ({ symptomId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (symptomId) {
      fetch(`/api/products?symptomId=${symptomId}`)
        .then((response) => response.json())
        .then((data: Product[]) => setProducts(data));
    }
  }, [symptomId]);

  return (
    <div>
      {products.map((product) => (
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
