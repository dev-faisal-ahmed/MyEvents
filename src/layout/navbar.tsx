import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const isLoggedIn = false;

export function Navbar() {
  return (
    <nav>
      <Container className="flex items-center border-b py-6">
        <Link to="/">
          <Logo />
        </Link>

        <div className="ml-auto">
          {!isLoggedIn && (
            <>
              <Button className="">Register</Button>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
}
