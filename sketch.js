let fr = 30;
let currentGame;
let mainMenu;
let time;
let myTextFont;
let chalk;
let bgImage;
let screen;
let randomWords;
// let sfx1
// let sfx2

function preload() {
  bgImage = loadImage("./assets/board.webp");
  myTextFont = loadFont("./assets/Inter-Regular.ttf")
  menuFont = loadFont("./assets/Colored Crayons.ttf")
  randomWords = loadJSON('./words.json');

  // sfx1 = createAudio("./assets/scribble1.mp3")
  // sfx2 = createAudio("./assets/scribble2.mp3")
  sfx1 = loadSound("./assets/scribble1.mp3")
  sfx2 = loadSound("./assets/scribble2.mp3")
}

function setup() {
  screen = fitToBoard(bgImage)
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
  let gameInfo = JSON.stringify(currentGame.render());
  push()
  stroke("blue")
  let idk = myTextFont.textBounds(gameInfo, 30, 30)
  rect(idk.x,idk.y,idk.w,idk.h)
  text(gameInfo, 30, 30);
  pop()
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
