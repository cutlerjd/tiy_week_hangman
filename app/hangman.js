/*
Need to take in the request object of the session data parsed. Also take in a letter guess.

Return the following:
- Current word being guessed (future version encrypt to stop cheating)
- Display word
- Letters guessed
- Success of last guess
- Guesses remaining
- Game continues/ends

Fields to make
*/
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

function executePlay(sess) {
    if (sess.currentGame) {
        //Insert game play logic here
        checkDuplicateGuess(sess)
        checkLetters(sess)
        updateGameState(sess)
        return sess
    }
    else {
        //initialize game play
        sess.currentGame = true
        sess.wordLength = 8
        sess.currentWord = generateWord(sess.wordLength)
        sess.displayWord = sess.currentWord.replace(/./g,"_")
        sess.lettersGuessed = []
        sess.numberGuesses = 0
        sess.guessesAllowed = 8
        sess.guessesRemaining = sess.guessesAllowed
        sess.guess = ""
        return sess
    }
}

function checkDuplicateGuess(sess) {
    let duplicate = false;
    if (sess.lettersGuessed.findIndex(function (item) {
        return item == sess.guess
    }) > -1) {
        duplicate = true;
        sess.duplicateGuess = duplicate
        return sess
    }
    sess.duplicateGuess = duplicate
    sess.lettersGuessed.push(sess.guess)
    return sess
}

function checkLetters(sess) {
    let success = false;
    let solved = true
    let wordArray = sess.currentWord.split("")
    wordArray = wordArray.map(function (letter) {
        if (sess.lettersGuessed.findIndex(function (item) { return item == letter }) > -1) {
            if (sess.lettersGuessed[sess.lettersGuessed.length - 1] == letter) {
                success = true
            }
            return letter = letter;
        } else {
            solved = false
            return letter = "_"
        }
    })
    sess.displayWord = wordArray.reduce(function (a, b) {
        return a + b
    })
    sess.guessSuccess = success;
    sess.wordSolved = solved
    return sess
}
function updateGameState(sess) {
    if (sess.wordSolved) {
        sess.currentGame = false;
        return sess
    } else if (sess.guessSucess) {
        return sess
    }
    if (!sess.guessSuccess && !sess.duplicateGuess) {
        sess.numberGuesses += 1
        sess.guessesRemaining -= 1
    }
    if (sess.numberGuesses == sess.guessesAllowed) {
        sess.currentGame = false;
        return sess;
    } else {
        return sess;
    }
}
function generateWord(length){
    let word = "a"
    do {
        word = words[Math.floor(Math.random() * words.length)]
        console.log(word)
        console.log(word.length)
    }while (word.length >= length)
    return word
}
module.exports = executePlay

//Test code below
// let session = {}
// session = executePlay(session)
// console.log(session)
// session.guess = "a"
// session = executePlay(session)
// console.log(session)
// session.guess = "a"
// session = executePlay(session)
// console.log(session)
// session.guess = "b"
// session = executePlay(session)
// console.log(session)
// session.guess = "x"
// session = executePlay(session)
// console.log(session)
// session.guess = "y"
// session = executePlay(session)
// console.log(session)
// session.guess = "z"
// session = executePlay(session)
// console.log(session)
// session.guess = "q"
// session = executePlay(session)
// console.log(session)
// session.guess = "v"
// session = executePlay(session)
// console.log(session)
// session.guess = "x"
// session = executePlay(session)
// console.log(session)
// session.guess = "i"
// session = executePlay(session)
// console.log(session)
// session.guess = "r"
// session = executePlay(session)
// console.log(session)
// session.guess = "o"
// session = executePlay(session)
// console.log(session)