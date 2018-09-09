const {Session} = require('../lib/database')
const service = module.exports = {}


/**
 * Gen editor session database object
 *
 * @param {Object} raw raw session info
 * @param {String} raw.filetype
 * @param {String} raw.filename
 * @param {String} raw.project
 * @param {String} raw.filetype
 * @param {Date} raw.start
 * @param {Date} raw.end
 * @param {Number} raw.ticks
 * @returns {Object} Session instance
 */
function genSession (raw) {
  let {start, end} = raw
  start = new Date(start)
  end = new Date(end)

  let duration = end - start
  let {filename, filetype, ticks, project} = raw

  return Session({
    start, duration,
    filename, filetype,
    ticks, project
  })
}

service.save = function (sessions) {
  let docs = sessions.map(s => {
    return genSession(s)
  }).map(s => {
    return s.save()
  })

  return Promise.all(docs)
}

service.get = function ({from, to}) {
  return sessions
    .find({start: {$lte: to, $gte: from}})
    .exec()
}
