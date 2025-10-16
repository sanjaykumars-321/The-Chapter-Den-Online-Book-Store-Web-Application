import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart as updateCartApi } from "../../services/apiCart";

export const useUpdateCart = function () {
  const queryClient = useQueryClient();
  const {
    mutate: updateCart,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, quantity, price }) =>
      updateCartApi({ id, quantity, price }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  return { updateCart, isLoading, error };
};
