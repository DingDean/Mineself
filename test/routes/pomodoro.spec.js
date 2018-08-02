const app = require('../../src/app')
const supertest = require('supertest')
const assert = require('assert')

describe('POST /pomodoro', function () {
  describe('when Authorization header is missing', function () {
    it('should reject with 401', function (done) {
      supertest(app)
        .post('/pomodoro')
        .expect(401, done)
    })
  })

  describe('when verification failed', function () {
    it('should reject with 401', function (done) {
      supertest(app)
        .post('/pomodoro')
        .set('Authorization', 'Bearer TOTAL_WRONG_TOKEN')
        .expect(401, done)
    })
  })

  describe('when verification succeed', function () {
    const agent = supertest(app)
    var access_token 
    before(function (done) {
      agent
        .post('/auth')
        .send({apiToken: "test api token"})
        .expect(200)
        .end(function (err, res) {
          access_token = res.body.access_token
          done()
        })
    })

    describe('if body does not have pomodoros', function () {
      it('should reject with 400', function (done) {
        agent
          .post('/pomodoro')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(400, done)
      })
    })

    describe('when received pomodoros', function () {
      it('should send back status 200', function (done) {
        agent
          .post('/pomodoro')
          .set('Authorization', `Bearer ${access_token}`)
          .send({pomodoros: [{
            start: Date.now(),
            minutes: 25,
            isComplete: true,
            thoughts: 'This is awesome'
          }]})
          .expect(200, done)
      })
    })
  })
})
