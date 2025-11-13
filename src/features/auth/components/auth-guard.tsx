import { FullPageLoader } from "@/components/shared/full-page-loader";
import { useAuth } from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router";

export function AuthGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullPageLoader message="Loading Auth Data" />;
  if (!user) return <Navigate to="/landing" />;

  return <Outlet />;
}
