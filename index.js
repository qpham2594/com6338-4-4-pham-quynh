var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

// Make variables for elements using getElementById

let correctGuesses = []
let incorrectGuesses = []
let guessedLetters = []

var maxGuesses = 10                 // max guesses allow is 10 and must define before we tell the remaining guess to show max guesses on html
var wins = 0
var losses = 0

var wordToGuess = document.getElementById('word-to-guess')
var remainingGuess = document.getElementById('remaining-guesses')
var incorrectLetters = document.getElementById('incorrect-letters')
var previousWord = document.getElementById('previous-word')
var wins = document.getElementById('wins')
var loss = document.getElementById('losses')

remainingGuess.textContent = maxGuesses
var currentWord = words[Math.floor(Math.random() * words.length)];      // picking random words from the array // random index multiply by the length of the words; math floor to round down
var tempWordDisplay = currentWord
var hiddenWord = Array(currentWord.length + 1).join('_');             // hidden word equals the lenngth of the randomized word (currentWord) plus 1 (space) and join with underscores - essentially replace the word with the underscores

wordToGuess.textContent = hiddenWord                                    // Allows H2 (word-to-guess) to display hiddenWord (where we have the word underscores)

document.onkeyup = function(e)                                             // Have program register key presses from user
{
  var key = e.key.toLowerCase()                                          // filtering keypresses
  // Regex (regular expression) is a sequence of characters that forms a search pattern; can use this to describe what you are searching for, and can be use for text replace operations
  // Brackets in regex is to find the range within those branckets; ^ is to match beginning of the string and $ is to match end of the string
  
  var letterRegex = /^[a-z]$/;      // create a variable that allows the program to only accept a-z and filter out numbers input            
  if (!letterRegex.test(key) || guessedLetters.includes(key)) {       // if the user is not putting in [a-z] or it's already one of the guessed letter, then the game won't acccept that input
    return;
  };

  guessedLetters.push(key)
  
  if (currentWord.includes(key)) {                      // Compare key presses to the random word
    correctGuesses.push(key);
    let hiddenWordLetters = hiddenWord.split('')            // split with '' give space in between the underscores
    let currentWordLetters = currentWord.split('')


     for (let i = 0; i < currentWord.length; i++) {           // using for loop to flip the underscores to the letter
       if (currentWord[i] === key) {                          // if current word is equals to the key input by user
         currentWordLetters[i] = '_';                       // current word letter is showing underscores
         hiddenWordLetters[i] = key;                        // hidden word letter is the key input
       }
     }    

    hiddenWord = hiddenWordLetters.join('')               // if the for loop statement matches, then hiddenword equals the current word, which then flips the underscores to the current word letter guessed
    currentWord = currentWordLetters.join('')

    wordToGuess.textContent = hiddenWord                // telling H2 (word-to-gues) to display hiddenword if everything matches 
  
    if (tempWordDisplay === hiddenWord) {                 // if the temporary current word (the word that user inputs matches what the answer is so far) matches the actual hidden word, then wins will add 1 and game will reset
      wins.innerText++
      reset()
    
    }

  } else {

    incorrectGuesses.push(key)                                      // otherwise, incorrect guesses will be recorded in incorrect letters, join by a comma in between
    incorrectLetters.textContent = incorrectGuesses.join(', ');
    remainingGuess.textContent--;                                   // remaining guesses will decrease by 1 everytime there's an input and it will show on html

    if (remainingGuess.textContent == 0) {                    // if remaining guess hits 0, then loss will increase by 1 and game will reset
      loss.textContent++; 
      reset()
    }
  }
  
function reset() {                                                            // need to set up reset function for game to reset at the end of every round
  previousWord.textContent = tempWordDisplay;                                     // previous word will display whatever the user guessed that was correct when game resets
  currentWord = words[Math.floor(Math.random() * words.length)];                // current word is randomized
  tempWordDisplay = currentWord                                                   // temprorary word (word during guess) is equal to current word
  hiddenWord = Array(currentWord.length + 1).join('_');                         // hidden word is the lenth of current word replaces by underscores with a space
  wordToGuess.textContent = hiddenWord                                        // letting H2 space shows hiddenword (underscore version of the word)
  remainingGuess.textContent = maxGuesses;                                      // remaning guess is max guesses, which is 10
  incorrectGuesses = [];                                                    // any blank [] or "" is to reset or give blank for when game resets
  guessedLetters = [];
  incorrectLetters.textContent = "";
}



}
