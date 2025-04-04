// src/components/AdminRoute.jsx

import { Navigate } from 'react-router-dom'

// 관리자 로그인 확인 (localStorage에 token 있는지 확인)
const AdminRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token')

  return isLoggedIn ? children : <Navigate to="/admin/login" />
}

export default AdminRoute