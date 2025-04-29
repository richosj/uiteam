// src/components/Contact.jsx
import React, { useState } from 'react'
import './contact.scss'

const phoneFormat = v => {
  const num = v.replace(/\D/g, '')
  if (num.length < 4) return num
  if (num.length < 8) return `${num.slice(0, 3)}-${num.slice(3)}`
  return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    project: '',
    email: '',
    file: null,
    details: '',
    agree: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = (k, v) => {
    let msg = ''
    switch (k) {
      case 'name':
      case 'date':
      case 'project':
        if (!v.trim()) msg = '필수 입력'
        break
      case 'phone':
        if (v.replace(/\D/g, '').length < 10) msg = '유효한 번호'
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = '유효한 이메일'
        break
      case 'file':
        if (v) {
          if (v.type !== 'application/zip') msg = 'ZIP만'
          else if (v.size > 100 * 1024 * 1024) msg = '100MB 이하'
        }
        break
      case 'details':
        if (v.length > 500) msg = '500자 이하'
        break
      case 'agree':
        if (!v) msg = '동의 필요'
        break
    }
    setErrors(e => ({ ...e, [k]: msg }))
  }

  const onChange = e => {
    const { name, type, value, checked, files } = e.target
    let val = type === 'checkbox'
      ? checked
      : type === 'file'
      ? files[0]
      : value
    if (name === 'phone') val = phoneFormat(val)
    setForm(f => ({ ...f, [name]: val }))
    validate(name, val)
  }

  const canSubmit =
    Object.entries(form).every(([k, v]) => k === 'file' ? true : v && !errors[k]) &&
    form.agree

  const onSubmit = async e => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null) data.append(k, v)
    })
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (!res.ok) throw new Error(await res.text())
      alert('문의 성공')
      setForm({ name:'', phone:'', date:'', project:'', email:'', file:null, details:'', agree:false })
      setErrors({})
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="contact-card" onSubmit={onSubmit}>
      <h2>Contact Us</h2>
      <div className="fields">
        <div className="field">
          <label>담당자명</label>
          <input name="name" value={form.name} onChange={onChange} />
          {errors.name && <small>{errors.name}</small>}
        </div>
        <div className="field">
          <label>연락처</label>
          <input name="phone" value={form.phone} onChange={onChange} placeholder="010-1234-5678" />
          {errors.phone && <small>{errors.phone}</small>}
        </div>
        <div className="field">
          <label>작업완료일</label>
          <input type="date" name="date" value={form.date} onChange={onChange} />
          {errors.date && <small>{errors.date}</small>}
        </div>
        <div className="field">
          <label>프로젝트명</label>
          <input name="project" value={form.project} onChange={onChange} />
          {errors.project && <small>{errors.project}</small>}
        </div>
        <div className="field">
          <label>이메일</label>
          <input type="email" name="email" value={form.email} onChange={onChange} />
          {errors.email && <small>{errors.email}</small>}
        </div>
        <div className="field">
          <label>파일첨부 (ZIP)</label>
          <input type="file" name="file" onChange={onChange} />
          {errors.file && <small>{errors.file}</small>}
        </div>
        <div className="field textarea">
          <label>상세문의 (max 500자)</label>
          <textarea name="details" value={form.details} onChange={onChange}></textarea>
          <div className="count">{form.details.length}/500</div>
          {errors.details && <small>{errors.details}</small>}
        </div>
      </div>
      <label className="agree">
        <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} />
        개인정보처리방침 동의 (필수)
      </label>
      {errors.agree && <small>{errors.agree}</small>}
      <button type="submit" disabled={!canSubmit || loading}>
        {loading ? '전송중…' : '문의보내기'}
      </button>
    </form>
  )
}
