import type { PropsWithChildren } from "react";
import { AuthProvider } from "./auth-provider";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </AuthProvider>
  );
}
