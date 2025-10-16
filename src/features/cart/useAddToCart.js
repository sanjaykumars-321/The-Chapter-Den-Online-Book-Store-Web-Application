import { useMutation } from "@tanstack/react-query";
import { insertToCart as insertToCartApi } from "../../services/apiCart";
import toast from "react-hot-toast";

export function useAddToCart() {
  const {
    mutate: insertToCart,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: insertToCartApi,
    onSuccess: () => {
      toast.success("Your book is successfully added to the cart.”");
    },

    onError: () => {
      toast.error("Your book was not added to the cart.");
    },
  });

  return { insertToCart, isLoading, error };
}
