const express = require('express')
const multer = require('multer')
const path = require('path')
const pool = require('../db')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext)
    cb(null, `${base}-${Date.now()}${ext}`)
  }
})
const upload = multer({ storage })

// 📩 문의 등록 + 이메일 전송
router.post('/', upload.single('file'), async (req, res) => {
  const { name, phone, date, project, email, details, agree } = req.body
  const file = req.file

  try {
    await pool.query(
      `INSERT INTO inquiries (name, phone, date, project, email, file_path, details, agree)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, phone, date, project, email, file?.path || null, details, agree === 'true']
    )
    console.log('✅ 문의 저장 완료')

    // ✉️ 메일 전송 설정
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    const mailOptions = {
      from: `"사이트 문의" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `[문의] ${project} - ${name}`,
      html: `
        <h2>새로운 문의가 도착했습니다.</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>프로젝트명:</strong> ${project}</p>
        <p><strong>완료일:</strong> ${date}</p>
        <p><strong>내용:</strong><br>${details.replace(/\n/g, '<br>')}</p>
      `,
      attachments: file ? [{
        filename: Buffer.from(file.originalname, 'utf8').toString('base64'),
        path: file.path,
        contentType: 'application/zip'
      }] : []
    }

    await transporter.sendMail(mailOptions)
    console.log('📧 메일 전송 완료')

    res.status(200).send('문의 저장 및 메일 전송 완료')

  } catch (err) {
    console.error('❌ 처리 실패:', err)
    res.status(500).send('서버 오류')
  }
})

// 📋 문의 리스트
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, phone, email, project, created_at FROM inquiries ORDER BY created_at DESC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('❌ 문의 리스트 조회 실패:', err)
    res.status(500).send('서버 오류')
  }
})

// 🔍 문의 상세
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM inquiries WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) return res.status(404).send('찾을 수 없음')
    res.json(result.rows[0])
  } catch (err) {
    console.error('❌ 상세 조회 실패:', err)
    res.status(500).send('서버 오류')
  }
})

module.exports = router
