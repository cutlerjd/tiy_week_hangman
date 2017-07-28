const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const executePlay = require('./app/hangman.js')
const session = require('express-session')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  if(req.session){
    req.session.guess = "a"
    req.session = executePlay(req.session)
    console.log(req.session)
  }
  res.render("index", {appType:"Express"})
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})