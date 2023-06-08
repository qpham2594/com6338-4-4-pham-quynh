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

// Pseudocode

// Make variables for elements using getElementById

let currentWord, hiddenWord = " ";
let corrects = [], incorrects = []; 
let letterGuess = []

var maxGuesses = 10
var wins = 0
var loss = 0
var incorrectLetters = []

var wordGuess = document.getElementById ('word-to-guess')
var remainingGuess = document.getElementById ('remaining-guesses').textContent = maxGuesses
var incorrectLetters = document.getElementById ('incorrect-letters')
var previousWord = document.getElementById ('previous-word')
var wins = document.getElementById ('wins')
var loss = document.getElementById ('losses')



document.onkeyup = function(e)                  // Have program register key presses
{
  console.log (e.key)
  var key = e.key.toLowerCase ()   // filtering keypresses
  // if (words.indexOf(key) == -1) return ; // if it's not in the array
  if (words.length === 1 && key.match(/[a-z]/i)) {
    if (letterGuess.includes(key)) {              // ignoring duplicate guesses
      return;
    }
  }
  
  var currentWord = words[Math.floor(Math.random() * words.length)];      // picking random words from the array // random index multiply by the length of the words; math floor to round down
  hiddenWord = randomWord(currentWord);
  wordGuess.textContent = hiddenWord  

  if (key === currentWord) {                      // Compare key presses to the random word
    corrects++;
    wins.textContent = corrects
    reset()
  } 
  else {
    remainingGuess--
    incorrectLetters.push(key);
    remainingGuess.textContent = maxGuesses;

    if (maxGuesses === 0) {
      loss ++; 
      reset ()

    }
  }
  
for (let i = 0; i < words.length; i++) {               // Underscore changes to letter if correct // Underscore remains the same if incorrect
  
    var currentLetter = wordGuess[i];
    if (letterGuess.includes(currentLetter)) {
      wordGuess += currentLetter;
    } else {
      wordGuess += "_";
    }
} 

function reset () {
  previousWord.textContent = currentWord;
  score++;
  scoreUpdate (); 
  maxGuesses = 10;
  remainingGuess.textContent = maxGuesses;
  incorrects = [];
  incorrectLetters.textContent = "";
}

function scoreUpdate (){
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordGuess.textContent () = hiddenWord;
  remainingGuess.textContent () = maxGuesses;

}

previousWord.textContent () = hiddenWord
incorrectLetters.textContent () = key


}


// Incorrect letters will show what key was pressed wrong
// If same key is pressed, nothing will change
// Remaining guess decreases by 1 from 10 each time a guess is put in
// Set up score counter to be at 0
// If letters are guess correctly before remaining guess hits 0, wins increases by 1
// If out of guess or guess incorrectly, losses increases by 1
// Game resets with new random word (for loop for game reset?)
// Previous word shows everytime game resets


