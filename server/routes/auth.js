const express = require('express')
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = express.Router() // ❗ 이거 꼭 있어야 함


router.post('/login', async (req, res) => {
    const { username, password } = req.body
  
    console.log('➡️ 로그인 시도:', username)
    console.log('입력한 비번:', password)
  
    try {
      const userResult = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      )
  
      if (userResult.rows.length === 0) {
        console.log('❌ 사용자 없음')
        return res.status(401).json({ message: '존재하지 않는 사용자입니다.' })
      }
  
      const user = userResult.rows[0]
      console.log('🔍 DB에서 가져온 해시 비번:', user.password)
  
      const isMatch = await bcrypt.compare(password, user.password)

      console.log('입력한 비번 (raw):', JSON.stringify(password))

      
      console.log('✅ 비번 일치 여부:', isMatch)
  
      if (!isMatch) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' })
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )
  
      console.log('🎉 토큰 발급 성공')
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } })
    } catch (err) {
      console.error('❌ 로그인 에러:', err)
      res.status(500).send('서버 오류')
    }
  })

  module.exports = router // ✅ export는 router 객체
