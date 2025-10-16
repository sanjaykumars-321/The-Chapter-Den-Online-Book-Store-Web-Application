import { useQuery } from "@tanstack/react-query";
import { OrderDetails } from "../../services/apiOrder";

export function useOrder() {
  const {
    data: orderDetails,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderDetails,
  });

  return { orderDetails, isLoading, error };
}
