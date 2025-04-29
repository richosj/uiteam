import React from 'react';
import { Link } from 'react-router-dom';


const AdminIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="mt-2 text-lg text-gray-600">
            프로젝트 및 내부 프로젝트를 관리할 수 있습니다.
            
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">프로젝트 관리</h2>
              <p className="text-gray-600 mb-4">
                외부에 공개되는 프로젝트를 관리합니다.
              </p>
              <Link
                to="/admin/projects"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                프로젝트 관리하기
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">내부 프로젝트 관리</h2>
              <p className="text-gray-600 mb-4">
                내부적으로만 사용되는 프로젝트를 관리합니다.
              </p>
              <Link
                to="/admin/internal-projects"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                내부 프로젝트 관리하기
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">문의 관리</h2>
              <p className="text-gray-600 mb-4">
                사용자로부터 받은 문의를 관리합니다.
              </p>
              <Link
                to="/admin/inquiries"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                문의 관리하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex; 