import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/auth";
//import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogOut() {
  const queryClient = useQueryClient();
  //const navigate = useNavigate();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      window.location.href = "/login";
      queryClient.invalidateQueries(["user", isLoading]);
      //navigate("/login");
      toast.success("your account logout");
    },
  });

  return { logout, isLoading };
}
