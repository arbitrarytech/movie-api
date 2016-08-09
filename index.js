var express = require('express')
var morgan = require('morgan')
var app = express()
var port = process.env.PORT || 8000
var movieSvc = require('./lib/movies')

app.use(morgan('combined'))

app.get('/movies', function (req, res) {
  var search = req.query.search
  if (!req.query.search) {
    return res.status(400).send('The parameter "search" must be present')
  }
  movieSvc.search(search, function (err, data) {
    (err) ? res.status(500).send(err) : res.json(data)
  })
})

app.get('/movies/:movieId', function (req, res) {
  var movieId = req.params.movieId
  movieSvc.getById(movieId, function (err, data) {
    (err) ? res.status(500).send(err) : res.json(data)
  })
})

app.listen(port, function () {
  console.log('http server listening on port ' + port)
})
