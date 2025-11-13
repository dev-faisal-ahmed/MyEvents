import { auth } from "@/lib/firebase/firebase-config";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

type TAuthContext = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<TAuthContext>({ user: null, isLoading: true });

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const authContext = useMemo(() => {
    return { user, isLoading };
  }, [user, isLoading]);

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
