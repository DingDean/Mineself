const svs = require('../services/editor')
const moment = require('moment')

async function save (req, res, next) {
  let {sessions} = req.body
  try {
    await svs.save(sessions)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

async function get (req, res, next) {
  let {from, to} = req.query

  if (from === undefined) {
    from = moment().startOf('day').toDate()
  }
  if (to === undefined) {
    to = moment().toDate()
  }

  if (moment(from).isAfter(to)) {
    return next(new Error('Invalid date input'))
  }

  try {
    let sessions = await svs.get({from, to})
    res.send(sessions)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  save, get
}
