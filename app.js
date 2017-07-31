const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const executePlay = require('./app/hangman.js')
const session = require('express-session')
const bodyParser = require('body-parser')

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

app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

app.post("/start", function(req,res, next){
  req.session.currentGame = false;
  req.session = executePlay(req.session)
  res.redirect("/game")
})
app.get("/game", function(req,res,next){
  if(req.session.currentGame){
    res.render("gamePlay",req.session)
  } else {
    res.render("results",req.session)
  }
})
app.post("/taketurn",function(req,res,next){
  req.session.guess = req.body.guess
  req.session = executePlay(req.session)
  res.redirect("/game")
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})