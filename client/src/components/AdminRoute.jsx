import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // role: "1" = team, "2" = admin
  const allowedRoles = ["1", "2"]
  if (!isAuthenticated || !user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminRoute
