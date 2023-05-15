import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProducts(symptomId: number | string) {
  const { data, error } = useSWR(
    `/api/products?symptomId=${symptomId}`,
    fetcher
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}
