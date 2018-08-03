const app = require('./src/app')
const mongo = require('./src/lib/database')

function checkApiKey () {
  let {JWT_SECRECT, SINGLE_TOKEN} = process.env
  if (!JWT_SECRECT || !SINGLE_TOKEN) {
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
