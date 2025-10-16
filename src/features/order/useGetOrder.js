import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../services/apiOrder";
import { useParams } from "react-router-dom";

export const useGetOrder = function () {
  const { id } = useParams();
  const {
    data: getOrder,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetails(id),
  });

  return { getOrder, isLoading, error };
};
