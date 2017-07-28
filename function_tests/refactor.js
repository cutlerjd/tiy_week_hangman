const word = "aabcdef"
const allowedGuesses = 8

let gameSession = {
    allowedGuesses : allowedGuesses,
    totalGuesses : 0,
    lettersGuessed : ["z"],
    letterGuessLast : "",
    guessSuccess : true,
    word : word,
    displayWord : "",
    gamePlay : gamePlay


}

function gamePlay(){
    console.log("Hello")
    console.log(this.lettersGuessed)
}

module.exports = gameSession()