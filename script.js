const words = ["apple", "grape", "mango", "peach", "berry"];
const secretWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let currentAttempt = 0;

// Initialize the game board
const board = document.getElementById("game-board");
for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < secretWord.length; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
    }
}

document.getElementById("submit-guess").addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase();

    // Validate the guess
    if (guess.length !== secretWord.length || !words.includes(guess)) {
        document.getElementById("message").textContent = "Invalid guess. Try again!";
        return;
    }

    // Populate the current row with the guess
    const tiles = Array.from(board.children);
    const startIdx = currentAttempt * secretWord.length;
    const rowTiles = tiles.slice(startIdx, startIdx + secretWord.length);

    // Check correctness and update tiles
    let correctCount = 0;
    for (let i = 0; i < secretWord.length; i++) {
        const tile = rowTiles[i];
        tile.textContent = guess[i].toUpperCase();
        tile.classList.add("filled");

        if (guess[i] === secretWord[i]) {
            tile.classList.add("correct");
            correctCount++;
        } else if (secretWord.includes(guess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    // Check if the player won or lost
    if (correctCount === secretWord.length) {
        document.getElementById("message").textContent = "Congratulations! You guessed the word!";
        document.getElementById("submit-guess").disabled = true;
    } else {
        currentAttempt++;
        if (currentAttempt >= maxAttempts) {
            document.getElementById("message").textContent = `Game over! The word was "${secretWord}".`;
            document.getElementById("submit-guess").disabled = true;
        }
    }

    guessInput.value = "";
});
