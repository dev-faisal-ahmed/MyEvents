import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { IoLogOut } from "react-icons/io5";
import { signOutUser } from "../auth.utils";

export function ProfileMenu() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <UserLoading />;
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          {user.photoURL && <AvatarImage src={user.photoURL} />}
          {user.displayName && <AvatarFallback>{user.displayName[0].toUpperCase()}</AvatarFallback>}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-md border bg-black/60 px-6 py-4" align="end" sideOffset={10}>
        <div className="mb-4 space-y-1 border-b pb-2">
          <h3>{user.displayName}</h3>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
        <Button onClick={signOutUser} variant="destructive" className="flex w-full items-center justify-center gap-2">
          <IoLogOut /> Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UserLoading = () => {
  return <Skeleton className="size-8 rounded-full" />;
};
