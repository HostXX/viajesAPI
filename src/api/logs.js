const { Router } = require('express')
const LogEntry = require('../models/LogEntry')

const router = Router()

router.get('/', (req, res) => {
  res.json({
    message: '🗺',
  })
})

// router.post('/test', async (req, res, next) => {
//   console.log(req.body)
//   res.app.set('testPassingValue', req.body)
//   res.json({
//     message: 'received',
//   })
// })

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
    return next(error)
  }
})

router.put('/modify', async (req, res, next) => {
  try {
    return res.json({
      message: 'modify completed',
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    return next(error)
  }
})

router.delete('/delete', async (req, res, next) => {
  try {
    const removed = await LogEntry.deleteOne({ _id: req.body.entryId })
    res.status(200)
    return res.json({
      removed,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    return next(error)
  }
})

module.exports = router
