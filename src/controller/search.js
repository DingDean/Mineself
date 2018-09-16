const {save} = require('../services/search')
const ctl = module.exports = {}

ctl.save = async function (req, res, next) {
  let {url} = req.body
  try {
    await save(url)
    res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
}

ctl.getRawTokens = async function (req, res, next) {
  res.send('raw tokens')
}
