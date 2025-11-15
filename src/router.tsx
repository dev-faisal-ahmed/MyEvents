import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense, type LazyExoticComponent } from "react";
// import { MainLayout } from "./layout/main-layout";
import { AuthGuard } from "./features/auth/components/auth-guard";
import { FullPageLoader } from "./components/shared/full-page-loader";

const MainLayout = lazy(() => import("@/layout/main-layout"));

const lazyPages = {
  home: lazy(() => import("@/pages/home-page")),
  newEvent: lazy(() => import("@/pages/new-event-page")),
  eventDetails: lazy(() => import("@/pages/event-details-page")),
  editEvent: lazy(() => import("@/pages/edit-event-page")),
  favorite: lazy(() => import("@/pages/favorite-events-page")),

  // auth
  landing: lazy(() => import("@/pages/landing-page")),

  // not found page
  notFound: lazy(() => import("@/pages/not-found-page")),
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
    element: withSuspense(MainLayout),
    children: [
      {
        path: "/",
        element: <AuthGuard />,
        children: [
          { path: "/", element: withSuspense(lazyPages.home) },
          { path: "/events/new", element: withSuspense(lazyPages.newEvent) },
          { path: "/events/favorite", element: withSuspense(lazyPages.favorite) },
          { path: "/events/:id", element: withSuspense(lazyPages.eventDetails) },
          { path: "/events/:id/edit", element: withSuspense(lazyPages.editEvent) },
        ],
      },
      // auth
      {
        path: "/landing",
        element: withSuspense(lazyPages.landing),
      },

      {
        path: "*",
        element: withSuspense(lazyPages.notFound),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
