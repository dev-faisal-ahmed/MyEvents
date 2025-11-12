import { AuthProvider } from "./context/auth-context";
import { Router } from "./router";

export function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}
