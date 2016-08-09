var movieSvc = require('../lib/movies')
var nock = require('nock')

describe('Movie Service', function () {
  describe('.search', function () {
    it('should work', function (done) {
      nock('http://www.omdbapi.com')
        .get('/')
        .query({plot: 'full', s: 'foo'})
        .reply(200, {foo: 'bar'})
      movieSvc.search('foo', done)
    })
  })
})
