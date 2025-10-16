import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/books");
      queryClient.invalidateQueries(["user"]);
      toast.success("Your account successfully signed up");
    },
    onError: () => {
      toast.error("Your account already exists. Please log in.", { error });
    },
  });

  return { signup, isLoading, error };
}
