import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectForm = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    year: '',
    type: '',
    client: '',
    date: '',
    description: '',
    thumbnail: null,
    background: null,
    titleImage: null,
    detailImages: [],
  })

  const onChange = (e) => {
    const { name, type, files, value } = e.target
    if (type === 'file') {
      if (e.target.multiple) {
        setForm((f) => ({ ...f, [name]: [...files] }))
      } else {
        setForm((f) => ({ ...f, [name]: files[0] }))
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    Object.entries(form).forEach(([key, val]) => {
      if (!val) return // null/빈값 제외
      if (Array.isArray(val)) {
        val.forEach((file) => data.append(key, file))
      } else {
        data.append(key, val)
      }
    })

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: data,
      })
      if (!res.ok) throw new Error('등록 실패')

      alert('등록 완료')
      navigate('/admin/projects') // 목록으로 이동
    } catch (err) {
      alert('등록 실패')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">새 프로젝트 등록</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="title" placeholder="제목" className="w-full p-2 border rounded" onChange={onChange} required />
        <input name="year" placeholder="연도" className="w-full p-2 border rounded" onChange={onChange} required />
        <input name="type" placeholder="타입 (ex: 웹)" className="w-full p-2 border rounded" onChange={onChange} required />
        <input name="client" placeholder="클라이언트" className="w-full p-2 border rounded" onChange={onChange} required />
        <input name="date" type="date" className="w-full p-2 border rounded" onChange={onChange} required />
        <textarea name="description" placeholder="설명" className="w-full p-2 h-32 border rounded" onChange={onChange} required />

        <div>
          <label className="block">썸네일</label>
          <input name="thumbnail" type="file" accept="image/*" onChange={onChange} required />
          {form.thumbnail && <div className="text-sm text-gray-500">{form.thumbnail.name}</div>}
        </div>

        <div>
          <label className="block">배경 이미지</label>
          <input name="background" type="file" accept="image/*" onChange={onChange} required />
          {form.background && <div className="text-sm text-gray-500">{form.background.name}</div>}
        </div>

        <div>
          <label className="block">타이틀 이미지</label>
          <input name="titleImage" type="file" accept="image/*" onChange={onChange} required />
          {form.titleImage && <div className="text-sm text-gray-500">{form.titleImage.name}</div>}
        </div>

        <div>
          <label className="block">상세 이미지 (여러 개)</label>
          <input name="detailImages" type="file" multiple accept="image/*" onChange={onChange} />
          {form.detailImages.length > 0 &&
            <ul className="text-sm text-gray-500 list-disc ml-4">
              {form.detailImages.map((f, i) => <li key={i}>{f.name}</li>)}
            </ul>
          }
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type="submit">
          등록
        </button>
      </form>
    </div>
  )
}

export default ProjectForm
