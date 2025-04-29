import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-lg font-bold mb-6">관리자</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin" className="hover:text-blue-600">대시보드</NavLink>
        <NavLink to="/admin/projects" className="hover:text-blue-600">프로젝트</NavLink>
        <NavLink to="/admin/inquiries" className="hover:text-blue-600">문의</NavLink>
        {/* 필요하면 더 추가 */}
      </nav>
    </div>
  )
}

export default Sidebar
