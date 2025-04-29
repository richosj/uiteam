const express = require('express')
const pool = require('../db')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')


// 관리자용 전체 프로젝트 목록
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, type, client, created_at FROM projects ORDER BY created_at DESC`
    )
    res.json(result.rows)
  } catch (err) {
    console.error('프로젝트 목록 조회 실패:', err)
    res.status(500).send('서버 오류')
  }
})

// multer 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/projects/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `${uuidv4()}${ext}`
    cb(null, filename)
  }
})
const upload = multer({ storage })

// 프로젝트 등록 - /api/projects
router.post('/', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'background', maxCount: 1 },
  { name: 'titleImage', maxCount: 1 },
  { name: 'detailImages', maxCount: 10 },
]), async (req, res) => {
  try {
    const { title, year, type, client, date, description } = req.body
    const thumbnail = req.files?.thumbnail?.[0]?.path || null
    const background = req.files?.background?.[0]?.path || null
    const titleImage = req.files?.titleImage?.[0]?.path || null
    const detailImages = req.files?.detailImages || []

    const result = await pool.query(
      `INSERT INTO projects (title, year, type, client, date, description, thumbnail, background, title_image)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [title, year, type, client, date, description, thumbnail, background, titleImage]
    )

    const projectId = result.rows[0].id

    for (const img of detailImages) {
      await pool.query(
        `INSERT INTO project_details (project_id, image_path) VALUES ($1, $2)`,
        [projectId, img.path]
      )
    }

    res.status(200).send('등록 완료')
  } catch (err) {
    console.error('❌ 프로젝트 등록 실패:', err.message)
    res.status(500).send(err.message || '서버 오류')
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // 1. 삭제 대상 프로젝트의 이미지 경로 조회
    const result = await pool.query(`SELECT thumbnail, background, title_image FROM projects WHERE id = $1`, [id])
    const images = result.rows[0]

    const detailImages = await pool.query(
      `SELECT image_path FROM project_details WHERE project_id = $1`,
      [id]
    )

    // 2. 실제 파일 삭제
    const allPaths = [
      images.thumbnail,
      images.background,
      images.title_image,
      ...detailImages.rows.map(r => r.image_path)
    ]

    allPaths.forEach(filePath => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    })

    // 3. DB 삭제
    await pool.query(`DELETE FROM project_details WHERE project_id = $1`, [id])
    await pool.query(`DELETE FROM projects WHERE id = $1`, [id])

    res.send('삭제 완료')
  } catch (err) {
    console.error('프로젝트 삭제 실패:', err.message)
    res.status(500).send('서버 오류')
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const project = await pool.query(
      `SELECT id, title, year, type, client, date, description, thumbnail, background, title_image
       FROM projects WHERE id = $1`,
      [id]
    )

    const details = await pool.query(
      `SELECT image_path FROM project_details WHERE project_id = $1`,
      [id]
    )

    res.json({
      ...project.rows[0],
      detailImages: details.rows.map(row => row.image_path),
    })
  } catch (err) {
    console.error('상세 조회 실패:', err)
    res.status(500).send('서버 오류')
  }
})


router.put('/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'background', maxCount: 1 },
  { name: 'titleImage', maxCount: 1 },
  { name: 'detailImages', maxCount: 10 },
]), async (req, res) => {
  const { id } = req.params
  const { title, year, type, client, date, description } = req.body

  try {
    // 새 이미지가 있을 경우만 업데이트
    const getPath = (field) => req.files?.[field]?.[0]?.path.replace(/\\/g, '/') || null

    const thumbnail = getPath('thumbnail')
    const background = getPath('background')
    const titleImage = getPath('titleImage')
    const detailImages = req.files?.detailImages || []

    // 기존 데이터 수정
    await pool.query(`
      UPDATE projects SET title = $1, year = $2, type = $3, client = $4, date = $5, description = $6
      ${thumbnail ? ', thumbnail = $7' : ''}
      ${background ? ', background = $8' : ''}
      ${titleImage ? ', title_image = $9' : ''}
      WHERE id = $10
    `, [
      title, year, type, client, date, description,
      ...(thumbnail ? [thumbnail] : []),
      ...(background ? [background] : []),
      ...(titleImage ? [titleImage] : []),
      id
    ])

    // 상세 이미지 새로 등록 (기존 거 전부 삭제 후 다시 등록)
    if (detailImages.length > 0) {
      await pool.query(`DELETE FROM project_details WHERE project_id = $1`, [id])
      for (const img of detailImages) {
        await pool.query(
          `INSERT INTO project_details (project_id, image_path) VALUES ($1, $2)`,
          [id, img.path.replace(/\\/g, '/')]
        )
      }
    }

    res.send('수정 완료')
  } catch (err) {
    console.error('❌ 수정 실패:', err.message)
    res.status(500).send('서버 오류')
  }
})





module.exports = router
