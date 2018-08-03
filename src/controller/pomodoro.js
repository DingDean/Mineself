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

function get (req, res) {
}

function range (req, res) {

}

module.exports = {
  save, get, range
}
