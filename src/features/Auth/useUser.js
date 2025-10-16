import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth";

export function useUser() {
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
  // return {
  //   isLoading,
  //   user,
  //   isAuthenticated: user?.user_metadata. === ,
  // };
}
