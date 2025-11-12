import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MainLayout() {
  return (
    <section className="flex h-screen flex-col">
      <Navbar />
      <ScrollArea className="grow px-6">
        <Outlet />
      </ScrollArea>
    </section>
  );
}
