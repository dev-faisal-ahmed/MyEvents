import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold tracking-tight">404</h1>
      <p className="text-muted-foreground mt-4 max-w-md text-xl">
        The page you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link to="/">Browse Events</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 size-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
