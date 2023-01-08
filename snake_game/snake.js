//Add the board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//food
let foodX;
let foodY;

//snake speed
const velocityX = 0;
const velocityY = 0;

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // Used for drawing on the board.

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); //Runs the update funntion 10 times per second.
};

//Update the canvas
const update = () => {
  context.fillStyle = "black"; //Board color
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "lime"; //Snake color
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  context.fillStyle = "red"; //food color
  context.fillRect(foodX, foodY, blockSize, blockSize);
};

//Place food randomly
const placeFood = () => {
  //Used math.floor and math.random together to generate a random number within range of rows and cols
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

//Let the snake move
const changeDirection = (e) => {
  if (e.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};
