import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { signInWithGoogle } from "../auth.utils";
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
