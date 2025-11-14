import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoriteMap, toggleFavorite } from "./favorite-service";
import { queryKeys } from "@/lib/query-keys";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,

    // Sync with server responses
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorites] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.favorites, { type: "map" }] });
    },
  });
};

export const useGetFavoriteMap = () => {
  return useQuery({ queryKey: [queryKeys.favorites, { type: "map" }], queryFn: getFavoriteMap, select: (res) => res.data ?? {} });
};
