const svs = require('../services/editor')

async function save (req, res, next) {
  let {sessions} = req.body
  try {
    await svs.save(sessions)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  save
}
