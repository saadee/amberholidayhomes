import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

import AccountLayout from 'src/layouts/account';
import AuthBackgroundLayout from 'src/layouts/auth/background';

import { authRoutes } from './auth';
import { errorRoutes } from './error';
import { commonRoutes } from './common';

// import TravelTourPage from 'src/pages/travel/tour';

// ----------------------------------------------------------------------

// Auth Routes
const LoginBackgroundPage = lazy(() => import('src/pages/auth/login-background'));
const RegisterBackgroundPage = lazy(() => import('src/pages/auth/register-background'));

// Main Routes
const IndexPage = lazy(() => import('src/pages/travel/landing'));
const ToursPage = lazy(() => import('src/pages/travel/tours'));
const TravelTourPage = lazy(() => import('src/pages/travel/tour'));
const CheckoutPage = lazy(() => import('src/pages/travel/checkout'));
const OrderCompletedPage = lazy(() => import('src/pages/travel/order-completed'));
// Account Routes
const AccountOrdersPage = lazy(() => import('src/pages/e-commerce/account/orders'));
const AccountPaymentPage = lazy(() => import('src/pages/e-commerce/account/payment'));
const AccountPersonalPage = lazy(() => import('src/pages/e-commerce/account/personal'));
const AccountVouchersPage = lazy(() => import('src/pages/e-commerce/account/vouchers'));
const AccountWishlistPage = lazy(() => import('src/pages/e-commerce/account/wishlist'));
const WishlistPage = lazy(() => import('src/pages/e-commerce/wishlist'));

const PaymentError = lazy(() => import('src/sections/error/payment-error'));

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
        { path: 'wishlist', element: <WishlistPage /> },
        {
          path: 'account',
          element: (
            <AccountLayout>
              <Outlet />
            </AccountLayout>
          ),
          children: [
            { path: 'personal', element: <AccountPersonalPage /> },
            { path: 'wishlist', element: <AccountWishlistPage /> },
            { path: 'vouchers', element: <AccountVouchersPage /> },
            { path: 'orders', element: <AccountOrdersPage /> },
            { path: 'payment', element: <AccountPaymentPage /> },
          ],
        },
        {
          path: 'login',
          element: (
            <AuthBackgroundLayout>
              <LoginBackgroundPage />
            </AuthBackgroundLayout>
          ),
        },
        {
          path: 'register',
          element: (
            <AuthBackgroundLayout>
              <RegisterBackgroundPage />
            </AuthBackgroundLayout>
          ),
        },
        {
          path: 'payment-error',
          element: <PaymentError />,
        },
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
