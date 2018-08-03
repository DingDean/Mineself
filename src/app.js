const logger = require('./lib/logger')
const express = require('express')
const compression = require('compression')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
const config = require('config')

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
    require(`./routes/${component}`)
  )
})

/* Handle 404 */ 
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  let status = err.status || 500
  let {originalUrl, method} = req

  logger.error(`[${status}]-[${method} ${originalUrl}]-[${err.message}]`)
  if (err.stack)
    logger.error("%o", err.stack)
  // Joi Validation Error
  if (err.errors)
    logger.error("%o", err.errors)
  res.status(status).send(status === 500 ? '' : err.message)
})

module.exports = app
