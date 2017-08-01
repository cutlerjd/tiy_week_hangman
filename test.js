let arrGuess = ["a","b","z"]

let word = "bananas"

let wordArray = word.split('')
console.log(word)
console.log(wordArray)

resultVar = wordArray.map(function(letter){
    let arrGuessIndex = arrGuess.findIndex(function(item){
        return item == letter;
    })
    console.log(arrGuessIndex)
    if( arrGuessIndex > -1){
        return letter = letter
    }else {
        return "_"
    }
})

console.log(resultVar)