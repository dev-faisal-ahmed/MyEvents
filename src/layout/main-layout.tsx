import { Outlet } from "react-router";
import { Navbar } from "./navbar";

export default function MainLayout() {
  return (
    <section className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </section>
  );
}
