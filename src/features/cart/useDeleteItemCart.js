import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemCart as deleteItemCartApi } from "../../services/apiCart";
import toast from "react-hot-toast";

export function useDeleteItemCart() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCartItem,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (id) => deleteItemCartApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("book was not remove from your cart");
      console.log(error.message);
    },
  });
  return { deleteCartItem, isLoading, error };
}
