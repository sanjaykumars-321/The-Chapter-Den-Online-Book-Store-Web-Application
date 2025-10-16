import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "./useLogout";

export function useUpdatePassword() {
  const { logout } = useLogOut();
  const navigate = useNavigate();
  const {
    mutate: updatePassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSettled: () => {
      logout();
    },
    onSuccess: () => {
      toast.success("Successfully updated your account passowrd");
      navigate("/login");
    },
  });

  return { updatePassword, isLoading, error };
}
