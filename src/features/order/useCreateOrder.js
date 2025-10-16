import { useMutation } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateOrder() {
  const navigate = useNavigate();
  const {
    mutate: createOrder,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast.success("you place order is sucessfully");
      navigate("/orderConfirmationBill");
    },

    onError: () => {
      toast.error("error");
    },
  });
  return { createOrder, isLoading, error };
}
