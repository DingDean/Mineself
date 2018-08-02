const route = require('express').Router()
const {login} = require('../controller/auth')
module.exports = route

/**
 * @api {post} /auth Login
 * @apiName PostLogin
 * @apiGroup Auth
 *
 * @apiParam {String} apiToken The secret token set by yourself
 * @apiParamExample {json} Request-Example
 *  {
 *    apiToken: 'VERY SECRET TOKEN'
 *  }
 *
 * @apiSuccess {String} [access_token] The JWT Access Token Good For A Week
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 OK
 *  {
 *    access_token: 'YOU ARE CLEARED'
 *  }
 *
 * @apiError {String} error
 * @apiErrorExample {json} Error-Response
 *  HTTP/1.1 4XX
 *  {
 *    error: 'Unauthorized'
 *  }
 */
route.post('/', login)
