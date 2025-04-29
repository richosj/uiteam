import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectsAdmin = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/projects') // 관리자는 전체 다 봄
      .then(res => res.json())
      .then(data => {
        setList(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('프로젝트 불러오기 실패:', err)
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제할까요?')) return
  
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('삭제 실패')
      alert('삭제 완료')
      setList((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
      alert('삭제 중 오류 발생')
    }
  }

  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🛠 프로젝트 관리</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/admin/projects/new')}
        >
          + 새 프로젝트
        </button>
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">제목</th>
              <th className="p-2 border">클라이언트</th>
              <th className="p-2 border">타입</th>
              <th className="p-2 border">등록일</th>
              <th className="p-2 border">관리</th>
            </tr>
          </thead>
          <tbody>
            {list.map(project => (
              <tr key={project.id}>
                <td className="p-2 border">{project.title}</td>
                <td className="p-2 border">{project.client}</td>
                <td className="p-2 border">{project.type}</td>
                <td className="p-2 border">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => navigate(`/admin/projects/${project.id}`)}
                  >
                    보기
                  </button>
                  <button
                    className="text-green-600 underline"
                    onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                  >
                    수정
                  </button>
                  <button
                    className="text-red-600 underline"
                    onClick={() => handleDelete(project.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ProjectsAdmin
