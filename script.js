// Define HTML Elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define Game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

// Draw game Map , snake,food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

// Draw Snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// create A snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of the snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Testing Draw Function
// draw();

// draw food function
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// generate food location
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Moving Snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }
  snake.unshift(head);
//   snake.pop();
if(head.x === food.x && head.y === food.y){
    food=generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(()=>{
        move();
        checkCollision();
        draw();
    },gameSpeedDelay);
}else{
    snake.pop();
}
}

// Test Moving 
// setInterval(()=>{
//     move();
//     draw();
// },200)

// Start Game Function
function startgame(){
    gameStarted = true; //keep track of a runnign game
    instructionText.style.display ='none';
    logo.style.display ='none';
    gameInterval = setInterval(() => {
       move()
       checkCollision();
       draw(); 
    }, gameSpeedDelay);
}

// Keypress eventlistener
function handleKeyPress(event){
    if(
        (!gameInterval && event.code ==='Space') ||
        (!gameInterval && event.key ===' ')
        )
    {
        startgame();
    }else{
        switch(event.key){
            case 'ArrowUp':
            direction = 'up';
            break;
            case 'ArrowDown':
            direction = 'down';
            break;
            case 'ArrowRight':
            direction = 'right';
            break;
            case 'ArrowLeft':
            direction = 'left';
            break;
        }
    }
}

document.addEventListener('keydown',handleKeyPress);
function increaseSpeed(){
    if(gameSpeedDelay >150){
        gameSpeedDelay -=5;
    } else if(gameSpeedDelay >100){
        gameSpeedDelay -=3;
    } else if(gameSpeedDelay >50){
        gameSpeedDelay -=2;
    } else if(gameSpeedDelay >12){
        gameSpeedDelay -=1;
    }
}

// Check hititng wall or own body 
function checkCollision(){
    const head = snake[0];
    if(head.x < 1 || head.x > gridSize || head.y <1 || head.y >gridSize){
        resetGame();
    }
    for(let i=1 ;i <snake.length ;i++){
        if(head.x === snake[i].x &&head.y === snake[i].y){
            resetGame();
        }
    }
}

// reset Game 
function resetGame(){
    updateHighScore();
    stopGame();
    snake = [{x:10,y:10}];
    food= generateFood();
    direction='right';
    gameSpeedDelay=200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

function stopGame(){
    clearInterval(gameInterval);
    gameInterval=null;
    gameStarted = false;
    instructionText.style.display='block';
    logo.style.display='block';  
}
function updateHighScore(){
    const currentScore = snake.length -1;
    if(currentScore >highScore){
        highScore =currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display ='block';
}

