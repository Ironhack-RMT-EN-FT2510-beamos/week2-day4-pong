// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // the ball node is created
ballNode.id = "ball"; // we assign an id to the node, just for styles
gameBoxNode.append(ballNode); // we add the node to the game box

const paddleNode = document.createElement("div"); // the paddle node is created
paddleNode.id = "paddle"; // we assign an id to the node, just for styles
gameBoxNode.append(paddleNode); // we add the node to the game box

const ball = {
  node: ballNode,
  x: 30,
  y: 30,
  w: 20,
  h: 20,
  radius: 10,
  speed: 3,
  isMovingRight: true,
  isMovingDown: true
}

const paddle = {
  node: paddleNode,
  x: 200, // position in the x axis
  y: 550, // position in the y axis
  w: 100, // width of the element
  h: 20, // height of the element
  speed: 20
}

// *** Game Functions ***
function ballMovement() {

  if (ball.isMovingRight) {
    ball.x += ball.speed
    ball.node.style.left = `${ball.x}px`
  } else {
    ball.x -= ball.speed
    ball.node.style.left = `${ball.x}px`
  }

  if (ball.isMovingDown) {
    ball.y += ball.speed
    ball.node.style.top = `${ball.y}px`
  } else {
    ball.y -= ball.speed
    ball.node.style.top = `${ball.y}px`
  }
}

function detectBallWallCollision() {

  if ((ball.x + ball.w) > gameBoxNode.offsetWidth) {
    // console.log("ball hitting right wall")
    ball.isMovingRight = false
  }

  if ((ball.y + ball.h) > gameBoxNode.offsetHeight) {
    gameOver()
    // ball.isMovingDown = false
  }

  if (ball.x < 0) {
    ball.isMovingRight = true
  }

  if (ball.y < 0) {
    ball.isMovingDown = true
  }

}

function detectBallPaddleCollision() {

  if ((ball.y + ball.h) > paddle.y && ball.x > paddle.x && (ball.x + ball.w) < (paddle.x + paddle.w) ) {
    ball.isMovingDown = false
  }

}

function gameOver() {
  clearInterval(gameIntervalId)
  alert("You lose the game! get better, gg")
}

function gameLoop() {
  // console.log("testing")
  // this happends 60 frames per second

  ballMovement()
  detectBallWallCollision() // we ask if the collision is happening 60 times per second.
  detectBallPaddleCollision()
}




// *** Game Loop Interval ***
const gameIntervalId = setInterval(gameLoop, 1000/60) // 60fps




// *** Event Listeners ***
window.addEventListener("keydown", (event) => {
  console.log("clicking a key", event)
  if (event.key === "ArrowRight") {
    paddle.x += paddle.speed
    paddle.node.style.left = `${paddle.x}px`
  } else if (event.key === "ArrowLeft") {
    paddle.x -= paddle.speed
    paddle.node.style.left = `${paddle.x}px`
  }
})




// Bonus

/* 
if the ball bounces with the paddle, then increase the speed
if the ball bounces with the paddle, change the color of the ball
add a score that increase with every paddle collision
prevent the paddle from leaving the screen

*/