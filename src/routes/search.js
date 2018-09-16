const {save, getRawTokens} = require('../controller/search')
const {passport} = require('../lib/auth')
const router = require('express').Router()
const validate = require('express-validation')
const joi = require('joi')
module.exports = router

router.use(passport.authenticate('jwt', {session: false}))

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
  validate(schema.postSearch),
  save
)

/**
 * @api {get} /search/rawTokens Get unfiltered token list
 * @apiName GetSearchRawTokens
 * @apiGroup Search
 *
 * @apiDescription 
 * Return a list of tokens pending to be verified by user.
 * Each member of the list is a potential keyword of a search, it is 
 * user's responsibility to verify them.
 * 
 * @apiUse _AuthHeader
 *
 * @apiSuccess {String[]} list 
 * @apiSuccessExample {json} Success-Example
 *  HTTP/1.1 200 OK
 *  {
 *    list: ['unfiltered', 'tokens']
 *  }
 * @apiUse _AuthError
 */
router.get('/rawTokens', getRawTokens)

/**
 * @api {get} /search/tokens Get filtered token list
 * @apiName GetSearchTokens
 * @apiGroup Search
 *
 * @apiDescription 
 * Return a list of tokens verified by user.
 * Each member of the list is a keyword of a search.
 * 
 * @apiUse _AuthHeader
 *
 * @apiSuccess {String[]} list 
 * @apiSuccessExample {json} Success-Example
 *  HTTP/1.1 200 OK
 *  {
 *    list: ['search', 'tokens']
 *  }
 * @apiUse _AuthError
 */
router.get('/tokens', (req, res) => { res.send('tokens') })
