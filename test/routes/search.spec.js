const common = require('../common')
const app = require('../../src/app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const assert = require('assert')

describe('POST /search', function () {
  describe('When not authorized', function () {
    it('should reject with 401', function (done) {
      supertest(app)
        .post('/search')
        .expect(401, done)
    })
  })

  describe('When authorized', function () {
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

    describe('if the body does not have url property', function () {
      it('should reject with 400', function (done) {
        agent
          .post('/search')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(400, done)
      })
    })

    it('it should save the url', function (done) {
      const url = 'https://www.google.com/search?ei=ASY8W-LLBICx0PEP4fSGqAI&q=nodejs&oq=nodejs'
      agent
        .post('/search')
        .set('Authorization', `Bearer ${access_token}`)
        .send({url})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          mongoose
            .connection
            .model('Search')
            .findOne({query: 'nodejs'})
            .then(result => {
              assert(result)
              done()
            })
            .catch(done)
        })
    })
  })
})
