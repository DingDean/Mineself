const {Search} = require('../lib/database')
let service = module.exports = {}

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

/**
 * Get a list of unverified token of a query
 *
 * @param {String} query A query string extracted from search url
 * @param {Array} verified A list of verified tokens
 * @param {Array} garbage A list of garbage tokens
 * @returns {Array}
 */
service.genRawTokens = function (query, verified, garbage) {

}

const targets = {
  'google': 'q',
  'bing': 'q',
  'baidu': 'wd',
  'duckduckgo': 'q'
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

service.internals = {
  targets, getQuery, getSource
}

