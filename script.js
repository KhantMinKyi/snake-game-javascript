// Define HTML Elements 
const board = document.getElementById('game-board');

// Define Game variables

let snake = [{x:10,y:10}];

// Draw game Map , snake,food
function draw(){
    board.innerHTML = '';
    drawSnake();
}

// Draw Snake 
function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
}

// create A snake or food cube/div
function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of the snake or food 
function setPosition(element,position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Testing Draw Function 
draw();