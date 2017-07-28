const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const gameSession = require('./function_tests/refactor.js')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
gameSession.gamePlay()
app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})