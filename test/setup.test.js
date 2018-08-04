const mongoose = require('mongoose')
const {connect} = require('../src/lib/database')
connect()
// Fix duplicated schema compilation when using mocha -w
mongoose.models = {};
mongoose.modelSchemas = {};

after(function (done) {
  Promise.all([
    mongoose.connection
    .dropCollection('tomatoes'),
    mongoose.connection
    .dropCollection('sessions'),
    mongoose.connection
    .dropCollection('searches'),
  ])
  .then(() => {
    // close the connect so that
    // mocha could exit
    mongoose.connection.close()
    done()
  })
  .catch(done)
})
