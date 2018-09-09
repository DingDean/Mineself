const svs = require('../services/pomodoro')

async function save (req, res, next) {
  let {pomodoros} = req.body
  try {
    await svs.save(pomodoros)
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
    let timers = await svs.get({from, to})
    res.send(timers)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  save, get
}
