const {Search} = require('../lib/database')
let service = module.exports = {}

const targets = {
  'google': 'q',
  'bing': 'q',
  'baidu': 'wd'
}

function getQuery (url, source) {
  let queries = url.split('?')
  if (queries.length < 2) 
    return null

  queries = queries[1]
    .split('&')
    .reduce( (pre, cur) => { 
      let [key, value] = cur.split('=')
      pre[key] = value
      return pre
    }, {})
  let target = targets[source]
  if (target && queries[target])
    return decodeURIComponent(queries[target])
  return null
}

function getSource (url) {
  let match = url.match(/.(\w+).com/)
  if (match)
    return match[1]
  return null
}
 
service.save = async function (url) {
  let source = getSource(url)
  let query = getQuery(url, source)
  if (query) {
    let doc = new Search({
      originalUrl: url,
      source,
      topic: 'na',
      query, 
      timestamp: new Date(), 
    })
    return doc.save()
  } else {
    return null
  }
}

service.internals = {
  targets, getQuery, getSource
}

