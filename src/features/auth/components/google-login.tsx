import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { signInWithGoogle } from "../auth-service";
import type { PropsWithChildren } from "react";

export function GoogleLogin({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();

  if (user) return null;

  return (
    <Button onClick={signInWithGoogle} disabled={isLoading}>
      {children}
    </Button>
  );
}
