const mongoose = require('mongoose')
const {connect} = require('../src/lib/database')
connect()
// Fix duplicated schema compilation when using mocha -w
mongoose.models = {};
mongoose.modelSchemas = {};

after(function (done) {
  mongoose.connection
    .dropCollection('tomatoes')
    .then(() => done())
    .catch(done)
})
