import { Outlet } from "react-router";
import { Navbar } from "./navbar";

export function MainLayout() {
  return (
    <section className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </section>
  );
}
