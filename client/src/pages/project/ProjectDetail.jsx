import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/public/projects/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        console.error('상세 조회 실패:', err)
        alert('데이터를 불러오지 못했습니다')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-6">불러오는 중...</p>
  if (!data) return <p className="p-6">데이터 없음</p>

  const {
    title, year, type, client, date, description,
    thumbnail, background, title_image, detailImages
  } = data

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 underline">← 목록으로</button>

      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{year} • {type} • {client}</p>
      <p className="text-sm text-gray-400">{new Date(date).toLocaleDateString()}</p>
      <p className="mt-4 whitespace-pre-wrap leading-relaxed text-gray-700">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {thumbnail && (
          <div>
            <p className="text-sm font-medium mb-1">썸네일</p>
            <img src={`http://localhost:4000/${thumbnail}`} alt="thumbnail" className="w-full rounded" />
          </div>
        )}
        {background && (
          <div>
            <p className="text-sm font-medium mb-1">배경 이미지</p>
            <img src={`http://localhost:4000/${background}`} alt="background" className="w-full rounded" />
          </div>
        )}
        {title_image && (
          <div>
            <p className="text-sm font-medium mb-1">타이틀 이미지</p>
            <img src={`http://localhost:4000/${title_image}`} alt="title" className="w-full rounded" />
          </div>
        )}
      </div>

      {detailImages?.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">상세 이미지</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detailImages.map((src, i) => (
              <img key={i} src={`http://localhost:4000/${src}`} alt={`detail-${i}`} className="rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail