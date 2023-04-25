let menuItems = ["Start Game", "Options", "How To Play", "Credits", "Quit"];
let selectedMenuItem = 0;
let title = "Can I Erase?";

function preload() {
  img = loadImage("chalkboard.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function titleText() {
  textSize(80);
  textAlign(CENTER);
  text(title, windowWidth / 2, windowHeight / 4);
}

function menuText() {
  textSize(50);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < menuItems.length; i++) {
    if (i === selectedMenuItem) {
      //Highlights the selected menu item
      if (frameCount % 60 < 30) {
        fill(255, 0, 0);
      }
    } else {
      fill(0);
    }
    text(menuItems[i], windowWidth / 2, windowHeight / 2 + i * 60);
  }
}

function draw() {
  background(220);
  image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
  titleText();
  menuText();
}

function keyPressed() {
  //Up arrow key or "w" key press can be used to go up in the menu
  if (keyCode === UP_ARROW || keyCode === 87) {
    selectedMenuItem--;
    if (selectedMenuItem < 0) {
      selectedMenuItem = menuItems.length - 1;
    }
    //Down arrow key or "s" key press can be used to down up in the menu
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    //
    selectedMenuItem++;
    if (selectedMenuItem >= menuItems.length) {
      selectedMenuItem = 0;
    }
    //Menu Selection
    //"Enter" key or "Space" key press can be used to select an option in the menu
  } else if (keyCode === ENTER || keyCode === 32) {
    //Enter to select an item on the menu
    if (selectedMenuItem === 0) {
      //Start game
      window.location.href = "index.html";
      //http://127.0.0.1:5500/can-i-erase/index.html
    } else if (selectedMenuItem === 1) {
      //Options
    } else if (selectedMenuItem === 2) {
      //How to play game
    } else if (selectedMenuItem === 3) {
      //Credits
    } else if (selectedMenuItem === 4) {
      //Quit
    }
  }
}