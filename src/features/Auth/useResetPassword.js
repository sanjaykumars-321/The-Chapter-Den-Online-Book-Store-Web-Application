import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/auth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email!");
    },
    onError: () => {
      toast.error("Email is incorrect. If you are a new user, please sign up.");
    },
  });

  return { resetPassword, isLoading, error };
}
