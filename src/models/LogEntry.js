const mongoose = require('mongoose')

const LogEntrySchema = new mongoose.Schema({
  // userId: {
  //   type: String,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  visitedAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

const LogEntry = mongoose.model('LogEntry', LogEntrySchema)

module.exports = LogEntry
