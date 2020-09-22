const mongoose = require('mongoose')

const testModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})
const TestModel = mongoose.model('TestModel', testModel)

module.exports = TestModel
