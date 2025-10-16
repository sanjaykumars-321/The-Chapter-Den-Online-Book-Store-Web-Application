import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries(["user"]);
      navigate("/books");
      toast.success("your account successfully login");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error(
        "Email or password is incorrect. If you are a new user, please sign up.",
      );
    },
  });

  return { login, isLogin };
}
