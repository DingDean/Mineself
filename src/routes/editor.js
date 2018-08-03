const {save} = require('../controller/editor')
const {passport} = require('../lib/auth')
const router = require('express').Router()
const validate = require('express-validation')
const joi = require('joi')
module.exports = router

/**
 * @apiDefine SessionResponse
 *
 * @apiSuccess {Object[]} sessions Session List
 * @apiSuccess {String} sessions.filetype 
 * @apiSuccess {String} sessions.start Date string
 * @apiSuccess {Number} sessions.elapsed Duration in milliseconds
 * @apiSuccess {Number} sessions.ticks
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    sessions: [
 *      {
 *        filetype: 'go',
 *        start: "2018-08-01T09:53:59.710Z",
 *        elapsed: 60000,
 *        ticks: 200
 *      }
 *    ]
 *  }
 */

/**
 * @apiDefine SessionRequest
 *
 * @apiParam {Object[]} sessions Session List
 * @apiParam {String} sessions.filename 
 * @apiParam {String} sessions.filetype 
 * @apiParam {String} sessions.project 
 * @apiParam {String} sessions.start Date string
 * @apiParam {String} sessions.end Date string
 * @apiParam {Number} sessions.ticks
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    sessions: [
 *      {
 *        filetype: 'go',
 *        filename: 'test.go',
 *        project: 'Mineself',
 *        start: "2018-08-01T09:53:59.710Z",
 *        end: "2018-08-01T09:53:59.710Z",
 *        ticks: 200
 *      }
 *    ]
 *  }
 */

/**
 * @api {get} /editor/sessions Get Today's Editing Sessions
 * @apiName GetEditorSessions
 * @apiGroup Editor
 *
 * @apiUse SessionResponse
 */
router.get('/sessions', (req, res) => {
  res.send('editor')
})

/**
 * @api {post} /editor/sessions Save sessions
 * @apiName PostEditor
 * @apiGroup Editor
 *
 * @apiUse _AuthHeader
 * @apiUse SessionRequest
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 * @apiUse _AuthError
 */
const sessionObj = {
  filetype: joi.string().required(),
  filename: joi.string().required(),
  project: joi.string().default('na').optional(),
  start: joi.date().required(),
  end: joi.date().required(),
  ticks: joi.number().required()
}
const postEditorSchema = {
  body: {
    sessions: joi.array().items(sessionObj).required()
  }
}
router.post('/sessions', 
  passport.authenticate('jwt', {session: false}),
  validate(postEditorSchema),
  save
)

/**
 * @api {get} /editor/sessions/range Get editing sessions in a range
 * @apiName GetEditorSessionRange
 * @apiGroup Editor
 *
 * @apiUse _AuthHeader
 *
 * @apiUse SessionResponse
 *
 * @apiUse _AuthError
 */
router.get('/sessions/range', (req, res) => {
  res.send('sessions range')
})
