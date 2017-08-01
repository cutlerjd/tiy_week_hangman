const express = require('express');
const app = express.Router();
const executePlay = require('../model/hangman.js')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.post("/start", function(req,res, next){
  req.session.currentGame = false;
  req.session = executePlay(req.session)
  res.redirect("./game")
})

app.get("/game", function(req,res,next){
    
    
  if(req.session.currentGame){
    res.render("gamePlay",req.session)
  } else {
    res.render("results",req.session)
  }
})

app.post("/taketurn",function(req,res,next){
    console.log(req.body.guess)
    req.checkBody("guess","Please enter a letter").isAlpha('en-US')
    req.checkBody("guess","Please only enter one letter").isLength(1,1)
    console.log(req.validationErrors())
  req.session.guess = req.body.guess
  req.session = executePlay(req.session)
  res.redirect("./game")
})

module.exports = app