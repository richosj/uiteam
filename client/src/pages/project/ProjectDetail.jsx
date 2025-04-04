// src/pages/project/ProjectDetail.jsx
import { useParams } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()

  // 이 부분은 나중에 실제 API나 DB 연결하면 됨
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📝 프로젝트 상세</h1>
      <p className="text-gray-700 mb-2">ID: {id}</p>
      <p>여기에 프로젝트 상세 내용이 들어갑니다.</p>
    </div>
  )
}

export default ProjectDetail
