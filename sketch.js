let fr = 30;
let currentGame;
let mainMenu;
let time;
let myTextFont;
let chalk;
let bgImage;
let screen;

function preload() {
}

function setup() {
  bgImage = loadImage("./assets/board.webp");
  screen = fitToBoard(bgImage)
  myTextFont = loadFont("./assets/Inter-Regular.ttf")
  menuFont = loadFont("./assets/Colored Crayons.ttf")
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  currentGame = new Game(GameMode.SENTENCES, 30, 10);
  mainMenu = new Menu()
}

function draw() {
  background(bgImage);
  screen = fitToBoard(bgImage)
  time = (frameCount / fr).toFixed(2);
  mainMenu.render()
  let gameInfo = currentGame.render();
  text(JSON.stringify(gameInfo), 30, 30);
  // noLoop()
}

function fitToBoard(img) {
  let imgW = img.width
  let imgH = img.height
  let x1 = 240
  let y1 = 275
  let x2 = 1640
  let y2 = 990
  x = map(x1,0,imgW,0,width)
  y = map(y1,0,imgH,0,height)
  return {
    x: x,
    y: y,
    w: map(x2,0,imgW,0,width) - x,
    h: map(y2,0,imgH,0,height) - y
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  currentGame.resize()
  mainMenu.resize(windowWidth, windowHeight)
}

function keyPressed(e) {
  currentGame.keyPressed(e);
  mainMenu.keyPressed(e);
}
