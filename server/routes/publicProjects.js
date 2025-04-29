const express = require('express')
const pool = require('../db')
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const project = await pool.query(
        `SELECT id, title, year, type, client, date, description, thumbnail, background, title_image
         FROM projects WHERE id = $1`,
        [id]
      )
  
      if (project.rows.length === 0) {
        return res.status(404).send('해당 프로젝트 없음')
      }
  
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

  
router.get('/', async (req, res) => {
  const { year, keyword } = req.query

  try {
    let baseQuery = `SELECT id, title, thumbnail, year, type FROM projects WHERE 1=1`
    const params = []

    if (year) {
      params.push(year)
      baseQuery += ` AND year = $${params.length}`
    }

    if (keyword) {
      params.push(`%${keyword}%`)
      baseQuery += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`
    }

    baseQuery += ` ORDER BY created_at DESC`

    const result = await pool.query(baseQuery, params)
    res.json(result.rows)
  } catch (err) {
    console.error('공개 목록 조회 실패:', err)
    res.status(500).send('서버 오류')
  }
})

module.exports = router
