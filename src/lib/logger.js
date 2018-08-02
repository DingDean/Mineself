const {createLogger, format, transports} = require('winston')
const {colorize, json, prettyPrint, combine, printf} = format
const path = require('path')
const logFile = path.resolve('../../logs/mineself.log')
const testLogFile = path.resolve('../../logs/test.mineself.log')

const isTest = process.env.NODE_ENV === 'test'
function genTransports () {
  if (isTest) {
    return [
      new transports.File({filename: testLogFile, level: 'info'})
    ]
  } else {
    return [
      new transports.Console({level: 'debug'}),
      new transports.File({filename: logFile, level: 'info'})
    ]
  }

}

function genFormats () {
  const timestamp = format(function (info, opts) {
    if (!info.hasOwnProperty('timestamp')) {
      info.timestamp = new Date().toLocaleString()
    }
    return info
  })

  const finalFormat = printf(info => {
    return `[${info.timestamp}]-[${info.level}]: ${info.message}`
  })

  return {timestamp, finalFormat}
}

const {timestamp, finalFormat} = genFormats()
const logger = createLogger({
  level: process.env.VERBOSE ? 'verbose' : 'info',
  format: combine(
    colorize(),
    json(),
    timestamp(),
    prettyPrint(),
    finalFormat
  ),
  transports: genTransports()
})

module.exports = logger
