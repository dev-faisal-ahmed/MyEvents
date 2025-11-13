import type { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TTooltipContainerProps = PropsWithChildren<{ label: string }>;

export function TooltipContainer({ children, label }: TTooltipContainerProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
