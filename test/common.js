const app = require('../src/app')
const supertest = require('supertest')

function auth (agent, access_token) {
  return new Promise(function (resolve, reject) {
    const agent = supertest(app)
    agent
      .post('/auth')
      .send({apiToken: "test api token"})
      .expect(200)
      .end(function (err, res) {
        if (err)
          return reject(err)
        let access_token = res.body.access_token
        resolve({agent, access_token})
      })
  })
}

module.exports = {
  auth
}
