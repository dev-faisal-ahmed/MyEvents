import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/context/auth-context";
import { GoogleLogin } from "@/features/auth/components/google-login";
import { ProfileMenu } from "@/features/auth/components/profile-menu";
import { Link, useNavigate } from "react-router";
import { useLinks } from "./use-links";
import { useMediaQuery } from "@/lib/hooks";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HiMenuAlt1 } from "react-icons/hi";
import { useState } from "react";

export function Navbar() {
  const auth = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <nav>
      <Container className="grid grid-cols-2 items-center border-b py-6 lg:grid-cols-3">
        <div className="flex items-center gap-4">
          {!isDesktop && <MobileLinks />}
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {isDesktop && <DesktopLinks />}

        <div className="flex items-center justify-end">
          {!auth.user && <GoogleLogin>Register</GoogleLogin>}
          {auth.user && <ProfileMenu />}
        </div>
      </Container>
    </nav>
  );
}

// Desktop Links
const DesktopLinks = () => {
  const links = useLinks();

  return (
    <div className="font-title flex items-center justify-center gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn("border-b border-transparent py-2 font-bold", link.isActive && "text-primary border-primary")}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

// Mobile Links
const MobileLinks = () => {
  const links = useLinks();
  const navigate = useNavigate();
  const [open, onOpenChange] = useState(false);

  const handleNavigate = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>
        <HiMenuAlt1 className="text-foreground" size={24} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Navigation Menu for mobile screen</SheetDescription>
          <Logo />
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-2 px-4">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className={cn("border-b border-transparent py-1 text-left", link.isActive && "text-primary border-primary font-semibold")}
            >
              {link.title}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
