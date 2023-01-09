/*
  Author: Joe Duong
  This is the js file for the classic snake game.
*/

//TODO: Makes the initial snake longer.
//TODO: Adds game over logic.
//TODO: Adds score.
//TODO: Adds some music?

//Add the board
const blockSize = 25;
let rows = 24;
let cols = 24;
let board;
let context;

//Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//Food
let foodX;
let foodY;

//Snake speed
let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // Used for drawing on the board.

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1200 / 10); //Runs the update function 12 times per second. Longer means slower speed.
};

//Update the canvas
const update = () => {
  context.fillStyle = "black"; //Board color
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red"; //Food color
  context.fillRect(foodX, foodY, blockSize, blockSize);

  //When the snake eats the food, place a new food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime"; //Snake color
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  //Let the snake grow longer whenever it ate food
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
};

//Place food randomly
const placeFood = () => {
  //Used math.floor and math.random together to generate a random number within range of rows and cols
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

//Let the snake move
const changeDirection = (e) => {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
