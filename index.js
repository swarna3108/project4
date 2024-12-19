const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-button");
const playAgainButton = document.getElementById("play-again-button");
const finalScore = document.getElementById("final-score");
const timerDisplay = document.getElementById("timer");

let basket = { x: 180, y: 550, width: 40, height: 20 };
let hearts = [];
let score = 0;
let gameInterval;
let heartInterval;
let timeLeft = 30;
let timerCountdown;

// Start the game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameArea.classList.remove("hidden");
  resetGame();
  startGame();
});

// Play again
playAgainButton.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  gameArea.classList.remove("hidden");
  resetGame();
  startGame();
});

// Reset game variables
function resetGame() {
  basket.x = 180;
  score = 0;
  hearts = [];
  timeLeft = 30;
  timerDisplay.textContent = `Time: ${timeLeft}`;
}

// Start the game logic
function startGame() {
  heartInterval = setInterval(generateHeart, 1000);
  gameInterval = setInterval(updateGame, 20);

  timerCountdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Generate a new heart
function generateHeart() {
  const x = Math.random() * (canvas.width - 20);
  hearts.push({ x, y: 0, size: 20 });
}

// Update game state
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  ctx.fillStyle = "#ff66b3";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

  // Draw hearts
  hearts.forEach((heart, index) => {
    drawHeart(heart.x, heart.y, heart.size);

    heart.y += 3;

    // Check if heart is caught
    if (
      heart.y + heart.size >= basket.y &&
      heart.x + heart.size >= basket.x &&
      heart.x <= basket.x + basket.width
    ) {
      hearts.splice(index, 1);
      score++;
    }

    // Remove heart if it falls off
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    }
  });

  // Display score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Draw a heart shape
function drawHeart(x, y, size) {
  ctx.fillStyle = "#ff3385";
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
  ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
  ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
  ctx.closePath();
  ctx.fill();
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(heartInterval);
  clearInterval(timerCountdown);
  gameArea.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScore.textContent = score;
}

// Move basket
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && basket.x > 0) {
    basket.x -= 20;
  } else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
    basket.x += 20;
  }
});


