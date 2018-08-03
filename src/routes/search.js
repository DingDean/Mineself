const {save} = require('../controller/search')
const {passport} = require('../lib/auth')
const router = require('express').Router()
const validate = require('express-validation')
const joi = require('joi')
module.exports = router

const schema = {}
/**
 * @api {post} /search Save search query
 * @apiName PostSearch
 * @apiGroup Search
 *
 * @apiUse _AuthHeader
 *
 * @apiParam {String} url The search url
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    url: 'https://www.google.com/search?ei=ASY8W-LLBICx0PEP4fSGqAI&q=nodejs&oq=nodejs'
 *  }
 *
 * @apiUse _AuthError
 */
schema.postSearch = {
  body: {
    url: joi.string().required()
  }
}
router.post('/', 
  passport.authenticate('jwt', {session: false}),
  validate(schema.postSearch),
  save
)
