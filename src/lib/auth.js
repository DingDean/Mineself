const logger = require('./logger.js')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const config = require('config')

const isProduction = process.env.NODE_ENV === 'production'
const JWT_SECRECT = config.get('jwt_secret')

/* jwt generation */
function genJWT (payload) {
  return jwt.sign(payload, JWT_SECRECT, {
    algorithm: 'HS256',
    expiresIn: isProduction ? '7 days' : 3600,
  })
}

const JWTOptions = {
  algorithms: ['HS256'],
  secretOrKey: JWT_SECRECT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
passport.use(new Strategy(JWTOptions, function (jwt_payload, done) {
  done(null, true)
}))

module.exports = {
  passport,
  genJWT
}
