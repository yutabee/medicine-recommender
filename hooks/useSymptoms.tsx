const fetcher = (url: string) => fetch(url).then((res) => res.json());
import useSWR from "swr";

interface ProductOnSymptom {
  productId: number;
  product: {
    id: number;
    amazonId: string;
    name: string;
    description: string;
    imageUrl: string;
  };
}

interface Symptom {
  id: number;
  name: string;
  description: string;
  products: ProductOnSymptom[];
}

export function useSymptoms() {
  const { data, error } = useSWR<Symptom[]>("/api/symptoms", fetcher);

  return {
    symptoms: data,
    isLoading: !error && !data,
    isError: error,
  };
}
