import { lazy, Suspense } from 'react';
import AdminRoute from '../components/AdminRoute';
import AdminLayout from '../pages/admin/AdminLayout';

// Lazy loaded components
const Login = lazy(() => import('../pages/admin/Login'));
const AdminIndex = lazy(() => import('../pages/admin/AdminIndex'));
const InternalProjectAdmin = lazy(() => import('../pages/internalProject/admin/InternalProjectAdmin'));
const Inquiries = lazy(() => import('../pages/admin/Inquiries'));
const InquiriesDetail = lazy(() => import('../pages/admin/InquiriesDetail'));
const ProjectsAdmin = lazy(() => import('../pages/admin/ProjectAdmin'));
const ProjectDetailAdmin = lazy(() => import('../pages/admin/ProjectDetailAdmin'));
const ProjectForm = lazy(() => import('../pages/admin/ProjectForm'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export const adminRoutes = [
  {
    path: '/admin/login',
    element: <Suspense fallback={<Loading />}><Login /></Suspense>
  },
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><AdminIndex /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/internal-projects',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><InternalProjectAdmin /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/inquiries',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><Inquiries /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/inquiries/:id',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><InquiriesDetail /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/projects',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><ProjectsAdmin /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/projects/new',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><ProjectForm /></Suspense></AdminLayout></AdminRoute>
  },
  {
    path: '/admin/projects/:id',
    element: <AdminRoute><AdminLayout><Suspense fallback={<Loading />}><ProjectDetailAdmin /></Suspense></AdminLayout></AdminRoute>
  }
]; 