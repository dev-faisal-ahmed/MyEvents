import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { toggleFavorite } from "../favorite-service";
import { useRevalidate } from "@/lib/cache-helper";

type TFavoriteButtonProps = {
  id: string;
  initialFavorited: boolean;
};

export function FavoriteButton({ id, initialFavorited }: TFavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const { revalidate } = useRevalidate();

  useEffect(() => {
    setIsFavorited(initialFavorited);
  }, [initialFavorited]);

  const { mutate, isPending } = useMutation({ mutationFn: toggleFavorite });

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev);
    mutate(id, {
      onError: () => {
        setIsFavorited((prev) => !prev);
      },

      onSuccess: () => {
        revalidate("toggleFavorite");
      },
    });
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={cn(
        "text-primary flex size-8 items-center justify-center rounded-full bg-white transition",
        isPending && "cursor-not-allowed bg-white/60",
      )}
    >
      {isFavorited ? <FaStar size={20} /> : <FaRegStar size={20} />}
    </button>
  );
}
