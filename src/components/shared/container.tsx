import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type TContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: TContainerProps) {
  return <section className={cn("mx-auto px-6", className)}>{children}</section>;
}
