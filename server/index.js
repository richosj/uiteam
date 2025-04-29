const express = require('express')
const cors = require('cors')
const contactRoutes = require('./routes/contact')
const path = require('path')
const publicProjectRoutes = require('./routes/publicProjects')
const authRoutes = require('./routes/auth')

const app = express()

// 미들웨어
app.use(cors())
app.use(express.json()) // JSON body 파싱을 먼저 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 라우터
app.use('/api/contact', contactRoutes)
app.use('/api/projects', require('./routes/projects'))           // 관리자용 등록/삭제/수정/목록
app.use('/api/public/projects', publicProjectRoutes)
app.use('/api/auth', authRoutes) // ✅ 함수 호출 X, 그냥 라우터 객체 넘김

const PORT = 4000
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`)
})
