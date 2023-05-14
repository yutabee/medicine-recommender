import { useEffect, useState } from "react";

export default function ProductList({ symptomId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (symptomId) {
      fetch(`/api/products?symptomId=${symptomId}`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
  }, [symptomId]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}
