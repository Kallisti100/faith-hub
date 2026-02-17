import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import EventsPage from '@/components/pages/EventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import DonatePage from '@/components/pages/DonatePage';
import PartnersPage from '@/components/pages/PartnersPage';
import SpiritPage from '@/components/pages/SpiritPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "events",
        element: <EventsPage />,
        routeMetadata: {
          pageIdentifier: 'events',
        },
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
        routeMetadata: {
          pageIdentifier: 'event-detail',
        },
      },
      {
        path: "donate",
        element: <DonatePage />,
        routeMetadata: {
          pageIdentifier: 'donate',
        },
      },
      {
        path: "partners",
        element: <PartnersPage />,
        routeMetadata: {
          pageIdentifier: 'partners',
        },
      },
      {
        path: "spirit",
        element: <SpiritPage />,
        routeMetadata: {
          pageIdentifier: 'spirit',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
