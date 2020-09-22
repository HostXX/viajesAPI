const { Router } = require('express')
const LogEntry = require('../models/LogEntry')

const router = Router()

router.get('/', (req, res) => {
  res.json({
    message: '🗺',
  })
})

router.get('/all', async (req, res, next) => {
  try {
    const allLogs = await LogEntry.find()
    // console.log(allLogs)
    res.json(allLogs)
  } catch (error) {
    next(error)
  }
})

router.post('/post', async (req, res, next) => {
  try {
    const newLogEntry = new LogEntry(req.body)
    const savedEntrie = await newLogEntry.save()
    // console.log(savedEntrie);
    return res.json(savedEntrie)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422)
    }
    next(error)
  }
})

router.delete('/delete', async (req, res, next) => {
  try {
    return res.json({
      message: 'deleted succed',
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    next(error)
  }
})

module.exports = router
