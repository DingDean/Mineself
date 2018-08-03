const {Tomato} = require('../lib/database')

let services = module.exports = {}

services.save = async function (tomatos) {
  let docs = tomatos.map(tomato => {
    return new Tomato(tomato)
  })

  let ops = docs.map(doc => {
    return doc.save()
  })

  return Promise.all(ops)
}
