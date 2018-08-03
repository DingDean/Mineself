const config = require('config')
const mongoose = require('mongoose')
const logger = require('./logger')

const Session = mongoose.model('Session', mongoose.Schema({
  start: {type: Date, default: Date.now},
  duratoin: {type: Number, default: 0}, // time used in ms
  filename: String,
  filetype: String,
  ticks: Number,
  project: String
}))

const Tomato = mongoose.model('Tomato', mongoose.Schema({
  isComplete: Boolean,
  Start: Date,
  minutes: Number,
  thoughts: String
}))

const Search = mongoose.model('Search', mongoose.Schema({
  originalUrl: { type: String, default: 'na' },
  source: { type: String, default: 'na' },
  topic: { type: String, default: 'na' },
  query: String,
  timestamp: Date
}))

function connect () {
  const MONGO_URL = config.get('mongo')
  mongoose.Promise = global.Promise
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    keepAlive: 120
  }).then(() => {
    logger.info('connected to database')
  }).catch(err => {
    logger.error(err)
    throw new Error(err)
  })
}

module.exports = {
  Session, Tomato, Search,
  connect
}
