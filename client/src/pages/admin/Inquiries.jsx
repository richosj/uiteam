// src/pages/admin/Inquiries.jsx
import { useEffect, useState } from 'react'

const Inquiries = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => {
        setList(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('문의 불러오기 실패:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📨 문의 내역</h1>

      {loading ? (
        <p>불러오는 중...</p>
      ) : list.length === 0 ? (
        <p>문의가 없습니다.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">이름</th>
              <th className="p-2 border">이메일</th>
              <th className="p-2 border">프로젝트</th>
              <th className="p-2 border">날짜</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.email}</td>
                <td className="p-2 border">
                <a
                    href={`/admin/inquiries/${item.id}`}
                    className="text-blue-600 underline"
                >{item.project}
                </a>
                </td>
                <td className="p-2 border">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Inquiries
