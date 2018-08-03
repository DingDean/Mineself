const {internals} = require('../../src/services/search')
const assert = require('assert')

describe('getSource', function () {
  let cases = [
    {
      url: 'https://www.google.com/search?ei=ASY8W-LLBICx0PEP4fSGqAI&q=nodejs&oq=nodejs&gs_l=psy-ab.3..0i71k1l8.0.0.0.61677.0.0.0.0.0.0.0.0..0.0....0...1..64.psy-ab..0.0.0....0.w-tieqDewnE',
      expect: 'google'
    },
    {
      url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=test%20query&rsv_pq=e788af97000281fe&rsv_t=5ef1mLBRgizKnxLSJ4xKYLH6Ru7dh4y08p1FZxVjZzcpyOlDq2Fodl3gFgI&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=4&rsv_sug7=100',
      expect: 'baidu'
    },
    {
      url: 'https://cn.bing.com/search?q=test+query&qs=n&form=QBLHCN&sp=-1&pq=test+query&sc=6-10&sk=&cvid=1DEB2A2B57E546C18004BAE8238840C6',
      expect: 'bing'
    }
  ]

  cases.forEach((cas, i) => {
    it(`case ${cas.expect}`, function () {
      let s = internals.getSource(cas.url)
      assert.equal(s, cas.expect)
    })
  })
})

describe('getQuery', function () {
  let cases = [
    {
      url: 'https://www.google.com/',
      expect: null
    },
    {
      url: 'https://www.google.com/search?ei=ASY8W-LLBICx0PEP4fSGqAI&q=nodejs&oq=nodejs&gs_l=psy-ab.3..0i71k1l8.0.0.0.61677.0.0.0.0.0.0.0.0..0.0....0...1..64.psy-ab..0.0.0....0.w-tieqDewnE',
      source: 'google',
      expect: 'nodejs'
    },
    {
      url: 'https://www.google.com/search?ei=pSU8W9CCL76x0PEPw-KOGA&q=%E4%B8%AD%E6%96%87%E6%90%9C%E7%B4%A2&oq=%E4%B8%AD%E6%96%87%E6%90%9C%E7%B4%A2&gs_l=psy-ab.3...0.0.0.79081.0.0.0.0.0.0.0.0..0.0....0...1..64.psy-ab..0.0.0....0.sIFmKuQjUvA',
      source: 'google',
      expect: '中文搜索'
    },
    {
      url: 'https://www.google.com/search?q=match+string+between+%26+%26&oq=match+string+between+%26+%26&aqs=chrome..69i57j0l5.7997j0j1&sourceid=chrome&ie=UTF-8',
      source: 'google',
      expect: decodeURIComponent('match+string+between+%26+%26')
    },
    {
      url: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=test%20query&rsv_pq=e788af97000281fe&rsv_t=5ef1mLBRgizKnxLSJ4xKYLH6Ru7dh4y08p1FZxVjZzcpyOlDq2Fodl3gFgI&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=4&rsv_sug7=100',
      source: 'baidu',
      expect: 'test query'
    },
    {
      url: 'https://cn.bing.com/search?q=test+query&qs=n&form=QBLHCN&sp=-1&pq=test+query&sc=6-10&sk=&cvid=1DEB2A2B57E546C18004BAE8238840C6',
      source: 'bing',
      expect: 'test+query'
    }
  ]

  cases.forEach( (cas, i) => {
    it('case ' + cas.source, function () {
      assert.equal(internals.getQuery(cas.url, cas.source), cas.expect)
    })
  } )
})
