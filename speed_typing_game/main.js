window.addEventListener("load", init);

// Globals

let time = 5;
let score = 0;
let isPlaying;
let timeRemaining = time;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

document.getElementById("difficulty").onchange = function () {
  difficulty = document.getElementById("difficulty").value;

  if (difficulty == "easy") {
    time = 5;
  } else if (difficulty == "intermediate") {
    time = 3;
  } else {
    time = 1;
  }

  document.getElementById("seconds").innerHTML = time;
};

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition",
  "heroism",
  "excited",
  "ridiculous",
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = time;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    timeRemaining = time;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (timeRemaining > 0) {
    // Decrement
    timeRemaining--;
  } else if (timeRemaining === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = timeRemaining;
}

// Check game status
function checkStatus() {
  if (!isPlaying && timeRemaining === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}
