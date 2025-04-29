import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import NotFound from './pages/NotFound';
import { adminRoutes } from './routes/adminRoutes';
import { publicRoutes } from './routes/publicRoutes';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              
              {/* Admin Routes */}
              {adminRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
