const word = "aabcdef"
const allowedGuesses = 8
let currentGuesses = 7
let currentLetter = ["b","a","d","e","f"]
let letterGuess = "f"

console.log(gameContinue(gamelogic(letterGuess)))


function gamelogic(letterGuess){
    let result = {}
    if(duplicateGuess(letterGuess)){
        console.log("Duplicate guess!: " + letterGuess)
    }
    else {
        currentLetter.push(letterGuess)
        result = checkLetters(word,currentLetter,currentGuesses)
    }
    if(result.guessSuccess){
        result.guessCount = currentGuesses
        return result
    } else {
        currentGuesses += 1
        result.guessCount = currentGuesses
        return result
    }
}
function gameContinue(result){
    if(result.displayWord.indexOf("_") > -1 && result.guessCount < allowedGuesses){
        console.log("Game continues!")
    }else if (result.displayWord.indexOf("_") > -1){
        console.log("You're out of guesses and did not guess the word.")
    }else {
        console.log("You've won!")
    }
    return result
}
function duplicateGuess(letter){
    let duplicate = false;
    if(currentLetter.findIndex(function(item){return item == letter})> -1 ){
        return true
    }
    return duplicate
}
function checkLetters(word,currentLetter,currentGuesses) {
    let success = false
    let wordArray = word.split("")
    wordArray = wordArray.map(function(letter){
        if(currentLetter.findIndex(function(item){return item == letter})> -1 ){
            if(currentLetter[currentLetter.length -1] == letter){
                success = true
            }
            return letter = letter;
        }else {
            return letter = "_"
        }
    })
    let wordResult = wordArray.reduce(function(a,b){
        return a + b
    })
    return {displayWord: wordResult,
            guessSuccess: success,
            lastGuess: currentLetter[currentLetter.length-1],
            lettersGuessed: currentLetter}
}
