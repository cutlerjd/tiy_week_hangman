const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express')
const executePlay = require('./model/hangman.js')
const session = require('express-session')
const bodyParser = require('body-parser')
const gamePlayRouter = require('./routes/gamePlayRouter')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/game',gamePlayRouter)

app.get("/", function(req, res, next){
  res.render("index")
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})