const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  console.log(error.name);
  res.json({
    message: error.message,
    stack: process.env.DEV_STATUS === 'development' ? error.stack : '🤔 💕',
  })
}

module.exports = {
  errorHandler,
  notFound,
}
