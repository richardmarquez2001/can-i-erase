let currentWord

function setup() {
  createCanvas(400, 400);
  currentWord = new Sentence("")
  currentWord= new Sentence("Hello World")
  // currentWord.increment("red")
  // currentWord.increment("red")
  // currentWord.increment("red")
}

function draw() {
  background(220);
  rect(100, 100, 100, 100)
  currentWord.render(100,100)
  noLoop()
}

function setGradient(x, y, w, h, c1, c2) {
  push()
  noFill();
  // Top to bottom gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  pop()
}

function keyPressed(e) {
  // Prob some game state stuff

  // inc and dec
  // TODO: This is still broken
  print(e.key.length)
  if(e.key == "Backspace"){
    currentWord.decrement()
    print("tft")
  }
  else if(e.key.length == 1 && e.key.toLowerCase() == currentWord.currentLetter.text) {
    currentWord.increment("green")
  }
  else {
    currentWord.increment("red")
  }
  print("Goting to: ", currentWord.index)
  loop()

}

