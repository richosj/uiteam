// src/pages/admin/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  console.log('Login 페이지 렌더됨')


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // 임시 로그인 로직 (원래는 서버에 요청해야 함)
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('token', 'admin-token') // 가짜 토큰 저장
      navigate('/admin/internal-projects') // 로그인 성공 시 이동
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="아이디"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </form>
    </div>
  )
}

export default Login
