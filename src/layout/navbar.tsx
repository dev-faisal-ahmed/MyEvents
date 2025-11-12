import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/context/auth-context";
import { GoogleLogin } from "@/features/auth/components/google-login";
import { ProfileMenu } from "@/features/auth/components/profile-menu";
import { Link } from "react-router";

export function Navbar() {
  const auth = useAuth();

  return (
    <nav>
      <Container className="flex items-center border-b py-6">
        <Link to="/">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center">
          {!auth.user && <GoogleLogin>Register</GoogleLogin>}
          {auth.user && <ProfileMenu />}
        </div>
      </Container>
    </nav>
  );
}
