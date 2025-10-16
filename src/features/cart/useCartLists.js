import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/apiCart";

export function useCartLists() {
  const {
    data: cartList,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: getCart,
  });

  return { cartList, isLoading, error };
}
