const mongoose = require('mongoose')

mongoose.model('Session', mongoose.Schema({
  start: {type: Date, default: Date.now},
  inputTime: {type: Number, default: 0}, // time used in actual typing
  totalTime: {type: Number, default: 0}, // total time
  filename: String,
  filetype: String,
  ticks: Number,
  project: String
}))

mongoose.model('Tomato', mongoose.Schema({
  date: Number,
  type: Number, // 0-finished, 1-abandoned
  tStart: Number,
  tEnd: Number
}))

mongoose.model('Search', mongoose.Schema({
  originalUrl: { type: String, default: 'na' },
  source: { type: String, default: 'na' },
  topic: { type: String, default: 'na' },
  query: String,
  timestamp: Date
}))
