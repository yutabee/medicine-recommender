import { Symptom } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSymptoms() {
  const { data, error } = useSWR<Symptom[]>("/api/symptoms", fetcher);

  return {
    symptoms: data,
    isLoading: !error && !data,
    isError: error,
  };
}
