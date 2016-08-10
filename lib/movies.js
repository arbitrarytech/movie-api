var request = require('request')
var cacheManager = require('cache-manager')
var redisStore = require('cache-manager-redis')
var redisCache = cacheManager.caching({
  store: redisStore,
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  max: 100,
  ttl: 10
})

exports.search = function (query, cb) {
  request('http://www.omdbapi.com/?plot=full&s=' + query, function(err, res, data) {
    data = JSON.parse(data).Search
    cb(err, data)
  })
}

exports.getById = function (id, cb) {
  redisCache.wrap(id, function (cb) {
    request('http://www.omdbapi.com/?plot=full&i=' + id, function(err, res, data) {
      console.log('made request for id', id)
      data = JSON.parse(data)
      cb(err, data)
    })
  }, cb)
}
