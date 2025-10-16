import { useQuery } from "@tanstack/react-query";
import { getBooksLabels } from "../../services/apiBooks";

export function useBooksLabels() {
  const {
    isLoading,
    data: booksLabels,
    error,
  } = useQuery({
    queryKey: ["booksLabels"],
    queryFn: getBooksLabels,
  });

  return { isLoading, booksLabels, error };
}
