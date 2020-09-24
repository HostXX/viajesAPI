const { Router } = require('express')
const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const LogEntry = require('../models/LogEntry')

const router = Router()

const { API_KEY } = process.env

const rateLimitDelay = 5 * 1000; // 10 second delay
const limiter = new RateLimit({
  store: new MongoStore({
    uri: process.env.MONGO_URI,
    expireTimeMs: rateLimitDelay,
  }),
  max: 1,
  windowMs: rateLimitDelay,
});

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

router.post('/post', limiter, async (req, res, next) => {
  try {
    if (req.get('API_KEY') !== API_KEY) {
      res.status(401)
      throw new Error('UnAuthorized')
    }

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

// modify in construccion

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
      ...removed,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422)
    }
    return next(error)
  }
})

module.exports = router
