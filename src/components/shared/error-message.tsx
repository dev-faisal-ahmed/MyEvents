import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorMessage({ title = "Something went wrong", message, onRetry, className }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className={cn("border-red-700/40", className)}>
      <AlertCircle className="size-4" />
      <div className="flex flex-col gap-2">
        <div>
          <AlertTitle className="text-red-700/80">{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>

        {onRetry && (
          <Button
            variant="outline"
            className="mt-2 w-fit border-red-500/40 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </div>
    </Alert>
  );
}
