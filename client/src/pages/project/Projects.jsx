import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const [list, setList] = useState([])
  const [year, setYear] = useState('')
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchProjects = async () => {
    setLoading(true)
    const query = new URLSearchParams()
    if (year) query.append('year', year)
    if (keyword) query.append('keyword', keyword)

    try {
      const res = await fetch(`/api/public/projects?${query.toString()}`)
      const data = await res.json()
      setList(data)
    } catch (err) {
      console.error('프로젝트 목록 불러오기 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [year, keyword])

  const years = Array.from(new Set(list.map(p => p.year))).sort((a, b) => b - a)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="border px-3 py-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">전체 연도</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <input
          className="border px-3 py-2 rounded flex-1"
          type="text"
          placeholder="검색어 (제목 또는 설명)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : list.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              {p.thumbnail && (
                <img src={`http://localhost:4000/${p.thumbnail}`} alt={p.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-lg truncate">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.type} • {p.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
