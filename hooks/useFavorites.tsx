import { Product } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFavorites() {
  const { data, error } = useSWR<Product[]>("/api/favorites", fetcher);

  return {
    favorites: data,
    isLoading: !error && !data,
    isError: error,
  };
}
