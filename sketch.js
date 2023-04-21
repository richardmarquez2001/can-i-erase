let fr = 30
let currentGame
let time

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr)
  currentGame = new Game(60,10)
  currentGame.start()
}

function draw() {
  time = Math.trunc(frameCount / fr)
  let gameInfo = currentGame.render()
  text(JSON.stringify(gameInfo), 30, 30)
  // noLoop()
}

function keyPressed(e) {
  currentGame.keyPressed(e)
}

