let fr = 30;
let currentGame;
let time;
let myFont;
let bgImage;

function setup() {
  bgImage = loadImage("./background.jpeg");
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  currentGame = new Game(GameMode.SENTENCES, 60, 10);
  currentGame.start();
}

function draw() {
  background(bgImage);
  time = (frameCount / fr).toFixed(2);
  let gameInfo = currentGame.render();
  text(JSON.stringify(gameInfo), 30, 30);
  // noLoop()
}

function keyPressed(e) {
  currentGame.keyPressed(e);
}
