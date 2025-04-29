import React from 'react';
import LogoutButton from '../../components/LogoutButton';

const AdminHeader = () => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">관리자 페이지</h1>
        {/* 로그아웃 버튼 등 들어갈 수 있음 */}
        <LogoutButton />
      </header>
    )
  }
  
  export default AdminHeader
  