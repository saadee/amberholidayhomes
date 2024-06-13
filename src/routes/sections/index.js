import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { errorRoutes } from './error';
import { commonRoutes } from './common';
// import TravelTourPage from 'src/pages/travel/tour';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/travel/landing'));
const ToursPage = lazy(() => import('src/pages/travel/tours'));
const TravelTourPage = lazy(() => import('src/pages/travel/tour'));
const CheckoutPage = lazy(() => import('src/pages/travel/checkout'));
const OrderCompletedPage = lazy(() => import('src/pages/travel/order-completed'));

// const SupportPage = lazy(() => import('src/pages/support'));

export default function Router() {
  return useRoutes([
    {
      element: (
        <MainLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'listing', element: <ToursPage /> },
        { path: 'listing/:id', element: <TravelTourPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'order-completed', element: <OrderCompletedPage /> },
        // { path: 'support', element: <SupportPage /> },

        // ...marketingRoutes,

        // ...travelRoutes,

        // ...careerRoutes,

        // ...eLearningRoutes,

        // ...eCommerceRoutes,

        // ...componentsRoutes,
      ],
    },

    ...authRoutes,

    ...errorRoutes,

    ...commonRoutes,

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
