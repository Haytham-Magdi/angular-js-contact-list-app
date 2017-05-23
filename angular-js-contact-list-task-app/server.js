




var express = require('express')
var path = require('path')
// var compression = require('compression')

var app = express()

// app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))

//   res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


// send all requests to index.html so browserHistory works
// app.get('*', function (req, res) {
app.get('/contacts', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))

  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'dist', 'contacts.json'))
})

var PORT = 3300
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})

