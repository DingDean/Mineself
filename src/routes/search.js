const router = require('express').Router()
module.exports = router

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
router.post('/', (req, res) => {
  res.send('save search')
})
