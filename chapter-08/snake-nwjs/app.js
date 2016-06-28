'use strict';

var gui = require('nw.gui');
var currentState;

var canvas, ctx, gridSize, currentPosition, snakeBody, snakeLength, direction, score, suggestedPoint, allowPressKeys, interval, choice;



function togglePauseState () {
	if (currentState) {
		if (currentState === 'play') {
			pause();
      currentState = 'pause';
		} else {
			play();
      currentState = 'play';
		}
	} else {
		currentState = 'play';
		pause();
	}
}

var pauseKeyOptions = {
  key:'Ctrl+P', 
  active: togglePauseState,
  failed: function () {
    console.log('An error occurred');
  }
};

var pauseShortcut = new gui.Shortcut(pauseKeyOptions);
gui.App.registerGlobalHotKey(pauseShortcut);
process.on('exit', function () {
  gui.App.unregisterGlobalHotKey(pauseShortcut);
});


function updateScore () {
  score = (snakeLength - 3)*10;
  document.getElementById('score').innerText = score;
}

function hasPoint (element) {
  return (element[0] === suggestedPoint[0] && element[1] === suggestedPoint[1]);
}

function makeFoodItem () {
  suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (snakeBody.some(hasPoint)) {
    makeFoodItem();
  } else {
    ctx.fillStyle = 'rgb(10,100,0)';
    ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
  }
}

function hasEatenItself (element) {
  return (element[0] === currentPosition.x && element[1] === currentPosition.y);  
}

function leftPosition(){
 return currentPosition.x - gridSize;  
}

function rightPosition(){
  return currentPosition.x + gridSize;
}

function upPosition(){
  return currentPosition.y - gridSize;  
}

function downPosition(){
  return currentPosition.y + gridSize;
}

function whichWayToGo (axisType) {
  if (axisType === 'x') {
    choice = (currentPosition.x > canvas.width / 2) ? moveLeft() : moveRight();
  } else {
    choice = (currentPosition.y > canvas.height / 2) ? moveUp() : moveDown();
  }
}

function moveUp(){
  if (upPosition() >= 0) {
    executeMove('up', 'y', upPosition());
  } else {
    whichWayToGo('x');
  }
}

function moveDown(){
  if (downPosition() < canvas.height) {
    executeMove('down', 'y', downPosition());    
  } else {
    whichWayToGo('x');
  }
}

function moveLeft(){
  if (leftPosition() >= 0) {
    executeMove('left', 'x', leftPosition());
  } else {
    whichWayToGo('y');
  }
}

function moveRight(){
  if (rightPosition() < canvas.width) {
    executeMove('right', 'x', rightPosition());
  } else {
    whichWayToGo('y');
  }
}

function executeMove(dirValue, axisType, axisValue) {
  direction = dirValue;
  currentPosition[axisType] = axisValue;
  drawSnake();
}

function moveSnake(){
  switch (direction) {
    case 'up':
      moveUp();
      break;

    case 'down':
      moveDown();
      break;
      
    case 'left':
      moveLeft();
      break;

    case 'right':
      moveRight();
      break;
  }
}

function pause(){
  clearInterval(interval);
  allowPressKeys = false;
}

function play(){
  interval = setInterval(moveSnake,100);
  allowPressKeys = true;
}

function gameOver(){
  var score = (snakeLength - 3)*10;
  pause();
  window.alert('Game Over. Your score was ' + score);
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function drawSnake() {
  if (snakeBody.some(hasEatenItself)) {
    gameOver();
    return false;
  }
  snakeBody.push([currentPosition.x, currentPosition.y]);
  ctx.fillStyle = 'rgb(200,0,0)';
  ctx.fillRect(currentPosition.x, currentPosition.y, gridSize, gridSize);
  if (snakeBody.length > snakeLength) {
    var itemToRemove = snakeBody.shift();
    ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
  }  
  if (currentPosition.x === suggestedPoint[0] && currentPosition.y === suggestedPoint[1]) {
    makeFoodItem();
    snakeLength += 1;
    updateScore();
  }
}

window.document.onkeydown = function(event) {
  if (!allowPressKeys){
    return null;
  }
  var keyCode; 
  if(!event)
  {
    keyCode = window.event.keyCode; 
  }
  else 
  {
    keyCode = event.keyCode; 
  }
 
  switch(keyCode)
  {
    case 37:
      if (direction !== 'right') {
        moveLeft();
      }
      break;
     
    case 38:
      if (direction !== 'down'){
        moveUp();
      }
      break; 
      
    case 39:
      if (direction !== 'left'){
        moveRight();
      }
      break; 
    
    case 40:
      if (direction !== 'up'){
        moveDown();
      }
      break; 
    
    default: 
      break; 
  }
};

function start () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  currentPosition = {'x':50, 'y':50};
  snakeBody = [];
  snakeLength = 3;
  updateScore();
  makeFoodItem();
  drawSnake();
  direction = 'right';
  play();  
}

function initialize () {
	canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    gridSize = 10;
    start();
}

window.onload = initialize;