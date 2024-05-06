import { lazy } from 'react';

// ----------------------------------------------------------------------

const AboutPage = lazy(() => import('src/pages/e-learning/about'));
const BlogPage = lazy(() => import('src/pages/e-learning/posts'));
const ContactPage = lazy(() => import('src/pages/e-learning/contact'));
const CoursePage = lazy(() => import('src/pages/e-learning/course'));
const CoursesPage = lazy(() => import('src/pages/e-learning/courses'));
const LandingPage = lazy(() => import('src/pages/e-learning/landing'));
const PostPage = lazy(() => import('src/pages/e-learning/post'));

// ----------------------------------------------------------------------

export const eLearningRoutes = [
  {
    path: 'e-learning',
    children: [
      { element: <LandingPage />, index: true },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'course', element: <CoursePage /> },
      { path: 'posts', element: <BlogPage /> },
      { path: 'post', element: <PostPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
];
