import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, type LazyExoticComponent } from "react";
import { MainLayout } from "./layout/main-layout";
import { AuthGuard } from "./features/auth/components/auth-guard";
import { FullPageLoader } from "./components/shared/full-page-loader";

const lazyPages = {
  home: lazy(() => import("@/pages/home")),

  // auth
  landing: lazy(() => import("@/pages/landing")),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component: LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<FullPageLoader message="Wait till we load the page" />}>
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
        element: <AuthGuard />,
        children: [
          {
            path: "/",
            element: withSuspense(lazyPages.home),
          },
        ],
      },
      // auth
      {
        path: "/landing",
        element: withSuspense(lazyPages.landing),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
