const app = require('./src/app')
const mongo = require('./src/lib/database')
const config = require('config')

function checkApiKey () {
  let ok = config.has('jwt_secret')
  ok = ok && config.has('api_token')

  if (!ok) {
    throw new Error('Envirionment variable JWT_SECRECT or SINGLE_TOKEN NOT FOUND!')
  }
}


function main () {
  checkApiKey()
  mongo.connect()

  const PORT = config.get('port')
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

main()
