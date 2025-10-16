import { useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";
import { QueryClient, useQuery } from "@tanstack/react-query";

export function useBook() {
  const { id } = useParams();
  const {
    isLoading,
    data: book,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
  });

  return { isLoading, book, error };
}
