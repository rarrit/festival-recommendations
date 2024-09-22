import { handleUserLogin, handleUserRegister } from "@/core/api/authAPI";
import { QUERY_KEYS } from "@/core/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUserRegister,
    mutationKey: [QUERY_KEYS.REGISTER]
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleUserLogin,
    mutationKey: [QUERY_KEYS.LOGIN]
  });
};
