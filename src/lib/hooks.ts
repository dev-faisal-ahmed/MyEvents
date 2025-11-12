import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mqt = window.matchMedia(query);
    const listener = () => setMatch(mqt.matches);

    mqt.addEventListener("change", listener);
    listener();

    return () => mqt.removeEventListener("change", listener);
  }, [query]);

  return match;
};
