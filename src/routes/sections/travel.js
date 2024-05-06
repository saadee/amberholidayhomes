import { lazy } from 'react';

// ----------------------------------------------------------------------

const BlogPage = lazy(() => import('src/pages/travel/posts'));
const PostPage = lazy(() => import('src/pages/travel/post'));
const TourPage = lazy(() => import('src/pages/travel/tour'));
const AboutPage = lazy(() => import('src/pages/travel/about'));
const ToursPage = lazy(() => import('src/pages/travel/tours'));
const ContactPage = lazy(() => import('src/pages/travel/contact'));
const LandingPage = lazy(() => import('src/pages/travel/landing'));
const CheckoutPage = lazy(() => import('src/pages/travel/checkout'));
const OrderCompletedPage = lazy(() => import('src/pages/travel/order-completed'));

// ----------------------------------------------------------------------

export const travelRoutes = [
  {
    path: 'travel',
    children: [
      { element: <LandingPage />, index: true },
      { path: 'tours', element: <ToursPage /> },
      { path: 'tour', element: <TourPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-completed', element: <OrderCompletedPage /> },
      { path: 'posts', element: <BlogPage /> },
      { path: 'post', element: <PostPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
];
