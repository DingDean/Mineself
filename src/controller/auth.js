const {genJWT} = require('../lib/auth.js')
const config = require('config')

function login (req, res, next) {
  let {apiToken} = req.body
  if (!apiToken)
    return next({message: 'No Token Found', status: 400})
  if (apiToken !== config.get('api_token'))
    return next({message: 'Wrong Token', status: 403})
  let jwt = genJWT({appid: apiToken})

  res
    .cookie('access_token', jwt, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60000
    })
    .status(200)
    .json({access_token: jwt})
}

module.exports = {
  login
}
