import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const actions = {
  createEvent: [queryKeys.events],
  updateEvent: [queryKeys.events],
  deleteEvent: [queryKeys.events],
  toggleFavorite: [queryKeys.favorites, queryKeys.favoriteStatusMap],
};

export const useRevalidate = () => {
  const qc = useQueryClient();

  const revalidate = (action: keyof typeof actions) => {
    const keys = actions[action];
    keys.forEach((key) => qc.invalidateQueries({ queryKey: [key] }));
  };

  return { revalidate };
};
