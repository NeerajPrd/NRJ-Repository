// List of 5-letter words for the Wordle game
const WORDS = [
"about", "beach", "above", "alike", "arise", "began", "abuse", "alive", "begin", "adult",
    "alone", "birth", "black", "audio", "avoid", "allow", "aside", "bench", "actor", "blood",
    "along", "admit", "below", "adopt", "alert", "argue", "among", "after", "anger", "award",
    "again", "angle", "blame", "agree", "blind", "apple", "ahead", "buyer", "angry", "basic",
    "being", "aware", "board", "block", "china", "cover", "cable", "chose", "crash", "brain",
    "carry", "claim", "cream", "catch", "class", "crime", "bread", "cause", "clean", "cross",
    "break", "chain", "clear", "crowd", "chair", "click", "crown", "chart", "clock", "curve",
    "bring", "chase", "close", "cycle", "cheap", "coach", "daily", "broke", "check", "coast", "dance", "brown", "chest", "could", "build", "count", "child",
"court", "death", "entry", "forth", "group", "delay", "equal", "forty", "grown", "guard",
"event", "found", "guess", "doubt", "every", "frame", "guest", "dozen", "exact", "frank",
"guide", "exist", "fraud", "happy", "drama", "extra", "fresh", "faith", "front", "heart",
"dream", "false", "fruit", "heavy", "dress", "fault", "drill", "fiber", "funny", "night",
"drink", "field", "giant", "horse", "drive", "fifth", "given", "hotel", "fifty", "glass",
"house", "fight", "globe", "human", "eager", "final", "ideal", "early", "first", "grace",
"image", "earth", "fixed", "grade", "eight", "flash", "grand", "inner", "grant", "input",
"empty", "floor", "grass", "issue", "enemy", "fluid", "great", "irony", "enjoy", "focus",
"green", "juice", "enter", "force", "gross", "joint", "judge", "metal", "media", "known",
"local", "might", "noise", "label", "logic", "minor", "north", "large", "loose", "minus",
"laser", "lower", "mixed", "novel", "later", "lucky", "model", "nurse", "laugh", "lunch",
"money", "occur", "layer", "lying", "month", "ocean", "learn", "magic", "moral", "offer", "tease", "major", "motor", "often",
"least", "maker", "mount", "order", "leave", "march", "mouse", "other", "legal", "music",
"mouth", "ought", "level", "match", "movie", "paint", "light", "mayor", "paper", "limit",
"meant", "never", "party", "peace", "power", "radio", "round", "press", "raise", "route",
"phase", "price", "range", "royal", "phone", "pride", "rapid", "rural", "photo", "prime",
"ratio", "scale", "piece", "print", "reach", "scene", "pilot", "prior", "ready", "scope",
"pitch", "prize", "refer", "score", "place", "proof", "right", "sense", "plain", "proud",
"rival", "serve", "plane", "prove", "river", "seven", "plant", "queen", "quick", "shall",
"plate", "sixth", "stand", "shape", "point", "quiet", "roman", "share", "pound", "quite",
"rough", "sharp", "sheet", "spare", "style", "shelf", "speak", "sugar", "tired", "shell",
"speed", "suite", "title", "shift", "spend", "super", "today", "shirt", "spent", "sweet",
"topic", "shock", "split", "table", "total", "shoot", "spoke", "taken", "touch", "short",
"sport", "taste", "tough", "shown", "staff", "tower", "sight", "stage", "teach", "track",
"since", "stake", "teeth", "trade", "sixty", "start", "texas", "treat", "state", "thank",
"trend", "skill", "steam", "theft", "trial", "sleep", "steel", "their", "tried", "slide",
"stick", "theme", "small", "still", "there", "truck", "smart", "stock", "these", "truly",
"smile", "stone", "thick", "trust", "smith", "stood", "thing", "truth", "smoke", "store",
"think", "twice", "solid", "storm", "third", "under", "solve", "story", "those", "undue",
"sorry", "strip", "three", "sound", "stuck", "threw", "unity", "south", "study", "throw",
"until", "space", "stuff", "tight", "upper", "upset", "whole", "waste", "wound", "urban",
"whose", "watch", "write", "woman", "water", "wrong", "usual", "train", "wheel", "wrote",
"valid", "world", "where", "value", "worry", "which", "young", "video", "worse", "while",
"youth", "virus", "worst", "white", "worth", "visit", "would", "vital", "voice", "yacht",
"yahoo", "yeast", "young", "zebra"
];

// Select a random word from the list
let targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
let attempts = 6; // Number of attempts allowed
let currentAttempt = 0;

// DOM Elements
const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const message = document.getElementById("message");

// Create the 5x6 grid
function createGameBoard() {
    for (let i = 0; i < attempts; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}

// Update the grid with the user's guess
function updateGameBoard(guess, result) {
    const rows = document.querySelectorAll(".row");
    const cells = rows[currentAttempt].querySelectorAll(".cell");

    for (let i = 0; i < 5; i++) {
        cells[i].textContent = guess[i].toUpperCase(); // Display guessed letter
        if (result[i] === "🟩") {
            cells[i].style.backgroundColor = "#6aaa64"; // Green for correct letter in correct position
        } else if (result[i] === "🟨") {
            cells[i].style.backgroundColor = "#c9b458"; // Yellow for correct letter in wrong position
        } else {
            cells[i].style.backgroundColor = "#787c7e"; // Gray for incorrect letter
        }
    }
}

// Function to check the user's guess
function checkGuess(guess) {
    if (guess.length !== 5) {
        message.textContent = "Your guess must be exactly 5 letters long.";
        return;
    }

    if (!WORDS.includes(guess)) {
        message.textContent = "Your guess is not in the word list.";
        return;
    }

    // Generate feedback for the guess
    let result = Array(5).fill("⬛"); // Default to all incorrect
    const usedIndices = new Array(5).fill(false); // Track used letters in the target word

    // First pass: Check for correct letters in the correct position
    for (let i = 0; i < 5; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = "🟩";
            usedIndices[i] = true;
        }
    }

    // Second pass: Check for correct letters in the wrong position
    for (let i = 0; i < 5; i++) {
        if (result[i] === "⬛" && targetWord.includes(guess[i])) {
            for (let j = 0; j < 5; j++) {
                if (guess[i] === targetWord[j] && !usedIndices[j]) {
                    result[i] = "🟨";
                    usedIndices[j] = true;
                    break;
                }
            }
        }
    }

    // Update the game board with the guess and result
    updateGameBoard(guess, result);

    if (result.every((char) => char === "🟩")) {
        message.textContent = "Congratulations! You guessed the word correctly!";
        submitButton.disabled = true; // Disable further guesses
    } else {
        currentAttempt++;
        if (currentAttempt >= attempts) {
            message.textContent = `Game over! The word was "${targetWord.toUpperCase()}".`;
            submitButton.disabled = true; // Disable further guesses
        }
    }
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    checkGuess(guess);
    guessInput.value = ""; // Clear the input field
});

// Optional: Allow pressing "Enter" to submit the guess
guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitButton.click();
    }
});

// Initialize the game board
createGameBoard();