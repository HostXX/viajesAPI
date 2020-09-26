const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const logs = require('./api/logs')
const middlewares = require('./middlewares')

const rateLimitDelay = 5 * 1000; // 3 second delay
const limiter = new RateLimit({
  store: new MongoStore({
    uri: process.env.MONGO_URI,
    expireTimeMs: rateLimitDelay,
  }),
  max: 15,
  windowMs: rateLimitDelay,
});

const app = express()
app.enable('trust proxy')
app.use(express.json())
app.use(morgan(process.env.DEV_STATUS === 'development' ? 'combined' : 'common'))
app.use(helmet())
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN2, process.env.CORS_ORIGIN3],
  }),
)
app.use(limiter)

app.get('/', async (req, res) => {
  res.json({
    message: 'root',
  })
})

app.use('/api/logs', logs)

app.use(middlewares.notFound)

app.use(middlewares.errorHandler)

const port = process.env.PORT || 1335

// conections to services and start the app
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database running')
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
  })
