const express = require('express');
const app = express.Router();
const executePlay = require('../model/hangman.js')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.post("/start", function (req, res, next) {
  req.session.currentGame = false;
  req.session = executePlay(req.session)
  res.redirect("./game")
})

app.get("/game", function (req, res, next) {


  if (req.session.currentGame) {
    res.render("gamePlay", req.session)
  } else {
    res.render("results", req.session)
  }
})

app.post("/taketurn", function (req, res, next) {
  req.checkBody("guess", "Please enter a letter").isAlpha('en-US')
  req.checkBody("guess", "Enter one value").isLength(1, 1)
  let errors = req.validationErrors()
  if (errors) {
    req.session.errorMessage = errors
    errors.forEach(function(item){
      req.session.errorMessage =item.msg})
  } else {
    req.session.guess = req.body.guess.toLowerCase()
    req.session = executePlay(req.session)
  }
  res.redirect("./game")
})

module.exports = app