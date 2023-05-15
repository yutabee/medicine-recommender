export interface Symptom {
  id: number;
  name: string;
  description: string;
  products: ProductOnSymptom[];
}

export interface ProductOnSymptom {
  productId: number;
  product: {
    id: number;
    amazonId: string;
    name: string;
    description: string;
    imageUrl: string;
  };
}
