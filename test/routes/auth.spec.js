const app = require('../../src/app')
const supertest = require('supertest')

describe('POST /auth', function () {
  describe('when request body does not have an apiToken key', function () {
    it('should reject with 400', function (done) {
      supertest(app)
        .post('/auth')
        .send({})
        .expect(400, done)
    })
  })

  describe('when apiToken not match', function () {
    it('should reject with 403', function (done) {
      supertest(app)
        .post('/auth')
        .send({apiToken: "empty"})
        .expect(403, done)
    })
  })

  describe('when authenticated', function () {
    it('should pass the jwt as access_token in cookie', function () {
      supertest(app)
        .post('/auth')
        .send({apiToken: "test api key"})
        .expect(200)
        .expect('set-cookie', /access_token=\w+/)
    })
  })
})
