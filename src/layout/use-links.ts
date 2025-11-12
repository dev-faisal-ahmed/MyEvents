import { useMemo } from "react";
import { useLocation } from "react-router";

export type TLink = {
  href: string;
  title: string;
  isActive?: boolean;
};

export const useLinks = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = useMemo<TLink[]>(() => {
    const exactMatch = (path: string) => pathname === path;

    return [
      { title: "Home", href: "/", isActive: exactMatch("/") },
      { title: "Categories", href: "/categories", isActive: exactMatch("/categories") },
      { title: "Create Event", href: "/events/new", isActive: exactMatch("/events/new") },
    ];
  }, [pathname]);

  return links;
};
