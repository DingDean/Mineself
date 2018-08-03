const common = require('../common')
const app = require('../../src/app')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')

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
    var agent, access_token 

    before(function (done) {
      common.auth()
        .then(res => {
          agent = res.agent
          access_token = res.access_token
          done()
        })
        .catch(done)
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
      it('should save them', function (done) {
        agent
          .post('/pomodoro')
          .set('Authorization', `Bearer ${access_token}`)
          .send({pomodoros: [{
            start: Date.now(),
            minutes: 25,
            isComplete: true,
            thoughts: 'This is awesome'
          }]})
          .expect(200)
          .end(function (err, res) {
            mongoose.connection
              .model('Tomato')
              .findOne({thoughts: 'This is awesome'})
              .then(result => {
                assert(result)
                done()
              })
              .catch(done)
          })
      })
    })
  })
})
