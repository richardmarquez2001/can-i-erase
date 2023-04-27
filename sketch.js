let fr = 30;
let currentGame;
let mainMenu;
let time;
let myTextFont;
let chalk;
let bgImage;
let screen;
let randomWords;

const GameState = {
  IDLE: "IDLE",
  PLAYING: "PLAYING",
  END: "END",
};

function preload() {
  bgImage = loadImage("./assets/board.webp");
  myTextFont = loadFont("./assets/Inter-Regular.ttf");
  menuFont = loadFont("./assets/Colored Crayons.ttf");
  randomWords = loadJSON("./words.json");

  rightKey = loadSound("./assets/scribble3.mp3");
  // typing = loadSound("./assets/typing1.wav")
  wrongKey = loadSound("./assets/wrong1.mp3");
  canierase = loadSound("./assets/erase.mp3");
  click = loadSound("./assets/click.mp3");
}

function setup() {
  screen = fitToBoard(bgImage);
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  currentGame = new Game(GameMode.SENTENCES, 30, 2);
  mainMenu = new Menu();
}

function draw() {
  background(bgImage);
  screen = fitToBoard(bgImage);
  time = (frameCount / fr).toFixed(2);
  mainMenu.render();

  if (currentGame.gameState == GameState.PLAYING) {
    let gameInfo = JSON.stringify(currentGame.render());
    currentGame.drawStats(gameInfo, screen);
  }

  // noLoop()
}

function fitToBoard(img) {
  let imgW = img.width;
  let imgH = img.height;
  let x1 = 240;
  let y1 = 275;
  let x2 = 1640;
  let y2 = 990;
  x = map(x1, 0, imgW, 0, width);
  y = map(y1, 0, imgH, 0, height);
  return {
    x: x,
    y: y,
    w: map(x2, 0, imgW, 0, width) - x,
    h: map(y2, 0, imgH, 0, height) - y,
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  currentGame.resize();
  mainMenu.resize(windowWidth, windowHeight);
}

function keyPressed(e) {
  currentGame.keyPressed(e);
  mainMenu.keyPressed(e);
}
