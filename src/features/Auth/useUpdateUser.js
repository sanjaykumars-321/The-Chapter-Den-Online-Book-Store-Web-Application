import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/auth";

export function useUpdateUser() {
  const {
    mutate: updateUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({
      fullName,
      phoneNumber,
      doorNoStreet,
      landMark,
      city,
      pinCode,
      state,
      value,
    }) =>
      updateUserApi({
        fullName,
        phoneNumber,
        doorNoStreet,
        landMark,
        city,
        pinCode,
        state,
        value,
      }),
  });

  return { updateUser, isLoading, error };
}
