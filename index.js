const express = require('express')
const compression = require('compression')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
const config = require('config')

/* MongoDB */
const mongoose = require('mongoose')
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

/* Helmet */
app.use(helmet())

/* Setup Routes */
app.use(compression())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const routes = config.get('routes')
routes.forEach(({mount, component}) => {
  app.use(
    mount, 
    require(`./src/routes/${component}`)
  )
})

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
