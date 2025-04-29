import { lazy, Suspense } from 'react';
import Layout from '../components/layout/Layout';

// Lazy loaded components
const HomePage = lazy(() => import('../pages/home/Home'));
const ProjectsPage = lazy(() => import('../pages/project/Projects'));
const ProjectDetailPage = lazy(() => import('../pages/project/ProjectDetail'));
const InternalProjectDetailPage = lazy(() => import('../pages/internalProject/InternalProjectDetail'));
const TeamPage = lazy(() => import('../pages/team/Team'));
const ContactPage = lazy(() => import('../pages/contact/Contact'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export const publicRoutes = [
  {
    path: '/',
    element: <Layout><Suspense fallback={<Loading />}><HomePage /></Suspense></Layout>
  },
  {
    path: '/projects',
    element: <Layout><Suspense fallback={<Loading />}><ProjectsPage /></Suspense></Layout>
  },
  {
    path: '/projects/:id',
    element: <Layout><Suspense fallback={<Loading />}><ProjectDetailPage /></Suspense></Layout>
  },
  {
    path: '/internal-projects/:id',
    element: <Layout><Suspense fallback={<Loading />}><InternalProjectDetailPage /></Suspense></Layout>
  },
  {
    path: '/team',
    element: <Layout><Suspense fallback={<Loading />}><TeamPage /></Suspense></Layout>
  },
  {
    path: '/contact',
    element: <Layout><Suspense fallback={<Loading />}><ContactPage /></Suspense></Layout>
  }
]; 