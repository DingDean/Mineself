const app = require('./src/app')
const mongoose = require('mongoose')

function checkApiKey () {
  let {JWT_SECRECT, SINGLE_TOKEN} = process.env
  if (!JWT_SECRECT || !SINGLE_TOKEN) {
    throw new Error('Envirionment variable JWT_SECRECT or SINGLE_TOKEN NOT FOUND!')
  }
}

function connectMongo () {
  const MONGO_URL = config.get('mongo')
  mongoose.Promise = global.Promise
  mongoose.connect(MONGO_URL, {
    keepAlive: 120
  }).then(() => {
    console.info('connected to database')
  }).catch(err => {
    logger.error(err)
    throw new Error(err)
  })
}

function main () {
  checkApiKey()
  connectMongo()

  const PORT = config.get('port')
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

main()
