import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProjectDetailAdmin = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const BASE_URL = import.meta.env.VITE_API_URL



  useEffect(() => {
    fetch(`/api/projects/${id}`)
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
    <div className="p-6 space-y-4">
      <button className="text-sm text-gray-500 underline" onClick={() => navigate(-1)}>← 돌아가기</button>

      <h1 className="text-2xl font-bold">{title}</h1>
      <p><strong>연도:</strong> {year}</p>
      <p><strong>타입:</strong> {type}</p>
      <p><strong>클라이언트:</strong> {client}</p>
      <p><strong>일자:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>설명:</strong> {description}</p>

      <div className="grid grid-cols-2 gap-4">
        {thumbnail && (
          <div>
            <p className="text-sm font-medium mb-1">썸네일</p>
            <img src={`${BASE_URL}/${thumbnail}`} alt="thumbnail" className="w-full rounded" />
          </div>
        )}
        {background && (
          <div>
            <p className="text-sm font-medium mb-1">배경 이미지</p>
            <img src={`${BASE_URL}/${background}`} alt="background" className="w-full rounded" />
          </div>
        )}
        {title_image && (
          <div>
            <p className="text-sm font-medium mb-1">타이틀 이미지</p>
            <img src={`${BASE_URL}/${title_image}`} alt="title" className="w-full rounded" />
          </div>
        )}
      </div>

      {detailImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">상세 이미지</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {detailImages.map((src, idx) => (
              <img key={idx} src={`${BASE_URL}/${src}`} alt={`detail-${idx}`} className="rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetailAdmin
