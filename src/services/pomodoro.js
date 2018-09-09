const {Tomato} = require('../lib/database')

let services = module.exports = {}

services.save = function (tomatos) {
  let docs = tomatos.map(tomato => {
    return new Tomato(tomato)
  })

  let ops = docs.map(doc => {
    return doc.save()
  })

  return Promise.all(ops)
}

services.get = function ({from, to}) {
  return Tomato
    .find({start: {$lte:to, $gte: from}})
    .exec()
}
