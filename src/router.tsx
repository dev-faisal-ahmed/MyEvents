import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, type LazyExoticComponent, type ReactNode } from "react";
import { MainLayout } from "./layout/main-layout";

const lazyPages = {
  home: lazy(() => import("@/pages/home")),
  landing: lazy(() => import("@/pages/landing")),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component: LazyExoticComponent<any>, Fallback: ReactNode) => {
  return (
    <Suspense fallback={Fallback}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(lazyPages.home, <>Loading</>),
      },
      // auth
      {
        path: "/landing",
        element: withSuspense(lazyPages.landing, <>Loading</>),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
