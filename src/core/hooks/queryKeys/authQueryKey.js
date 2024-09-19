import { handleUserProfile } from "@/core/api/authAPI";
import { QUERY_KEYS } from "@/core/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => useQuery({
  queryFn: handleUserProfile,
  queryKey: [QUERY_KEYS.USER]
});