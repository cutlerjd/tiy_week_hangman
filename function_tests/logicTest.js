const word = "aabcdef"
const allowedGuesses = 8
const currentGuesses = 0
const currentLetter = ["b","a"]

console.log(checkLetters(word,currentLetter))


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
            lastGuess: currentLetter[currentLetter.length-1]}
}
