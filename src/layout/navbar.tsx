import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Link } from "react-router";

export function Navbar() {
  const auth = useAuth();

  return (
    <nav>
      <Container className="flex items-center border-b py-6">
        <Link to="/">
          <Logo />
        </Link>

        <div className="ml-auto">
          {!auth.user && (
            <>
              <Button className="">Register</Button>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
}
