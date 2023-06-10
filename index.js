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

var maxGuesses = 10
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
var tempCurrentWord = currentWord
var hiddenWord = Array(currentWord.length + 1).join('_');

wordToGuess.textContent = hiddenWord


document.onkeyup = function(e)                  // Have program register key presses
{
  var key = e.key.toLowerCase()   // filtering keypresses
  console.log(currentWord)

  var letterRegex = /^[a-z]$/;

  if (!letterRegex.test(key) || guessedLetters.includes(key)) {
    return;
  };

  guessedLetters.push(key)

  if (currentWord.includes(key)) {                      // Compare key presses to the random word
    correctGuesses.push(key);
    let hiddenWordLetters = hiddenWord.split('')
    let currentWordLetters = currentWord.split('')

     for (let i = 0; i < currentWord.length; i++) {
       if (currentWord[i] === key) {
         //currentWordLetters[i] = '_';
         hiddenWordLetters[i] = key;
       }
     }    

    hiddenWord = hiddenWordLetters.join('')
    currentWord = currentWordLetters.join('')

    wordToGuess.textContent = hiddenWord

    if (tempCurrentWord === hiddenWord) {
      wins.innerText++
      reset()
    }

  } else {

    incorrectGuesses.push(key)
    incorrectLetters.textContent = incorrectGuesses.join(', ');
    remainingGuess.textContent--;

    if (remainingGuess.textContent == 0) {
      loss.innerText++; 
      reset()
    }
  }
  
function reset() {
  previousWord.innerText = tempCurrentWord;
  currentWord = words[Math.floor(Math.random() * words.length)];
  tempCurrentWord = currentWord
  hiddenWord = Array(currentWord.length + 1).join('_');
  wordToGuess.innerText = hiddenWord
  remainingGuess.textContent = maxGuesses;
  incorrectGuesses = [];
  guessedLetters = [];
  incorrectLetters.textContent = "";
}

}

// Incorrect letters will show what key was pressed wrong
// If same key is pressed, nothing will change
// Remaining guess decreases by 1 from 10 each time a guess is put in
// Set up score counter to be at 0
// If letters are guess correctly before remaining guess hits 0, wins increases by 1
// If out of guess or guess incorrectly, losses increases by 1
// Game resets with new random word (for loop for game reset?)
// Previous word shows everytime game resets