let currentGame

function setup() {
  createCanvas(400, 400);
  currentGame = new Game()
}

function draw() {
  currentGame.render()
  noLoop()
}

function keyPressed(e) {
  currentGame.keyPressed(e)
}

