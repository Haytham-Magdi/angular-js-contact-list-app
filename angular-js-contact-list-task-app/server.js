




var express = require('express')
var path = require('path')
// var compression = require('compression')

var app = express()

// app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/mod/*', function (req, res) {
  var url2 = path.join(__dirname, req.url.replace('mod', 'node_modules'))
  res.sendFile(url2)
})

app.get('/contacts', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public', 'contacts.json'))
})

app.get('/recent-contact', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public', 'recent-contact.json'))
})

var PORT = 3300
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

