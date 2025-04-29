// src/pages/admin/InquiriesDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const InquiriesDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/contact/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('문의 상세 불러오기 실패:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="p-6">불러오는 중...</div>
  if (!data) return <div className="p-6">데이터 없음</div>

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">📋 문의 상세</h1>
      <p><strong>이름:</strong> {data.name}</p>
      <p><strong>이메일:</strong> {data.email}</p>
      <p><strong>연락처:</strong> {data.phone}</p>
      <p><strong>프로젝트:</strong> {data.project}</p>
      <p><strong>요청일:</strong> {data.date}</p>
      <p><strong>내용:</strong> <br />{data.details}</p>
      {data.file_path && (
        <p>
          <strong>첨부파일:</strong>{' '}
          <a href={`http://localhost:4000/${data.file_path}`} target="_blank" className="text-blue-600 underline">
            다운로드
          </a>
        </p>
      )}
    </div>
  )
}

export default InquiriesDetail
