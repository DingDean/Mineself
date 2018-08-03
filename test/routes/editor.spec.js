const common = require('../common')
const app = require('../../src/app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('assert')

describe('POST /editor/sessions', function () {
  describe('when Unauthorized', function () {
    it('should reject with 401', function (done) {
      supertest(app)
        .post('/editor/sessions')
        .expect(401, done)
    })
  })

  describe('when authorized', function () {
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

    it('should validate request body', function (done) {
      agent
        .post('/editor/sessions')
        .set('Authorization', `Bearer ${access_token}`)
        .send('wrong type')
        .expect(400, done)
    })

    it('should save the sessions', function (done) {
      agent
        .post('/editor/sessions')
        .set('Authorization', `Bearer ${access_token}`)
        .send({sessions: [{
          filetype: 'javascript',
          filename: 'test.js',
          start: new Date(),
          end: new Date(),
          ticks: 200
        }]})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          mongoose
            .connection
            .model('Session')
            .findOne({filename: 'test.js'})
            .then(doc => {
              assert(doc)
              done()
            })
            .catch(done)
        })
    })
  })
})
