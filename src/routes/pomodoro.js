const router = require('express').Router()
const {save, get} = require('../controller/pomodoro')
const {passport} = require('../lib/auth')
const validate = require('express-validation')
const joi = require('joi')
module.exports = router

router.use(passport.authenticate('jwt', {session: false}))

/**
 * @api {get} /pomodoro Get Pomodoro Timer In A Range
 * @apiName GetPomo
 * @apiGroup Pomodoro
 *
 * @apiUse _AuthHeader
 *
 * @apiParam {String} [from] Date string, default to today's start
 * @apiParam {String} [to] Date string, default to current new Date()
 * @apiParamExample {String} Query-Example
 * /pomodoro?from=2018-08-01T09:53:59.710Z&to=2018-09-01T09:53:59.710Z
 *
 *
 * @apiSuccess {Object[]} pomodoros Pomodoro session list
 * @apiSuccess {String} pomodoros.start The Timestamp when pomodoro session started
 * @apiSuccess {Number} pomodoros.minutes The Duration of the pomodoro session
 * @apiSuccess {Boolean} pomodoros.isComplete If the session is completed or abandoned
 * @apiSuccess {String} pomodoros.thoughts on this pomodoro session
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      pomodoros: [
 *        {
 *          start: "2018-08-01T09:53:59.710Z",
 *          minutes: 25,
 *          isComplete: true,
 *          thoughts: 'This is awesome.'
 *        }
 *      ]
 *    }
 *
 * @apiUse _AuthError
 */
const getSessionSchema = {
  query: {
    from: joi.date().optional(),
    to: joi.date().optional()
  }
}
router.get('/', 
  validate(getSessionSchema),
  get
)

/**
 * @api {post} /pomodoro Save pomodoro timer
 * @apiName PostPomo
 * @apiGroup Pomodoro
 *
 * @apiUse _AuthHeader
 *
 * @apiParam {Object[]} pomodoros Pomodoro session list
 * @apiParam {String} pomodoros.start The Timestamp when pomodoro session started
 * @apiParam {Number} pomodoros.minutes The Duration of the pomodoro session
 * @apiParam {Boolean} pomodoros.isComplete If the session is completed or abandoned
 * @apiParam {String} pomodoros.thoughts on this pomodoro session
 *
 * @apiParamExample {json} Request-Example
 *  {
 *    pomodoros: [
 *      {
 *        start: "2018-08-01T09:53:59.710Z",
 *        minutes: 25,
 *        isComplete: true,
 *        thoughts: 'This is awesome.'
 *      }
 *    ]
 *  }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 * @apiUse _AuthError
 */
const pomoObj = joi.object({
  start: joi.date().required(),
  minutes: joi.number().positive().required(),
  isComplete: joi.boolean().required(),
  thoughts: joi.string().default('Too lazy to give a thought')
})
const postPomoSchema = {
  body: {
    pomodoros: joi.array().items(pomoObj).required()
  }
}
router.post('/',
  validate(postPomoSchema),
  save
)
