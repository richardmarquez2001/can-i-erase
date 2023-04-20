class Sentence {
  constructor(string, size = 30, x = 0, y = 0, font = "Georgia") {
    this.string = [...string.toLowerCase()]
    this.colors = {"red": color("red"), "green": color("green"), "black": color("black")}
    this.size = size
    this.x = x
    this.y = y
    this.font = font
    this.index = 0
    this.end = false
    this.complete = false

    this.letters = this.split(this.string)
  }

  set currentIndex(index) {
    // can add validation
    if(index <= this.letters.length && index >= 0){
      if(index == this.letters.length){
        this.end = true
        let count = 0
        for(let l of this.letters) {
          if (l.color.toString() == color("red").toString()){
            count+=1
          }
        }
        if(count == 0){
          this.complete = true
        }
      } else {
        this.index = index
      }
    }
    else
    {
      // check for if the sentence is good?
    }
  }
  get currentIndex() {
    return this.index
  }


  get text() {
    return this.string.join()
  }

  get currentLetter() {
    return this.letters[this.currentIndex]
  }

  /**
   * Increments the index of the current character in the sentence
   * @param {ThisParameterType.colors} color the color to assign to the character before incrementing
   * @returns the letter before incrementing
   */
  increment(color) {
    // Invalid color
    if(!color in this.colors){
      throw err
    }

    let letter = this.currentLetter
    letter.color = this.colors[color]

    this.currentIndex = this.currentIndex + 1
    return letter
  }

  decrement(color) {
    if(this.end){
      this.end = false
      this.complete = false
    }
    else{
      this.currentIndex = this.currentIndex - 1
    }

    let letter = this.currentLetter
    letter.color = this.colors[color]
  }

  /**
   * Creates a list of renderable letters
   * @param {string} string 
   * @returns an array of letter objects
   */
  split(string) {
    let letters = []
    let xOffset = 0
    textSize(this.size)
    for( let [i, l] of string.entries() ){
      letters.push({
        index: i,
        text: l,
        color: this.colors["black"],
        isVisible: true,
        x: xOffset,
        y: 0
      })
      xOffset += textWidth(l)
    }
    return letters
  }

  /**
   * Renders the sentence
   * @param {Number} x 
   * @param {Number} y 
   */
  render(x = this.x, y = this.y) {
    push()
    for(let letter of this.letters){
      this.drawLetter(letter, x, y)
    }
    pop()
  }

  /**
   * Draws a letter
   * @param {*} letter 
   * @param {*} x 
   * @param {*} y 
   */
  drawLetter(letter, x, y) {
    // Checks if the letter is a space and was entered correctly
    if(letter.text == " " && letter.color.toString() != this.colors["black"].toString()){
      noStroke();
      let tempColor1 = color(letter.color.toString())
      let tempColor2 = color(letter.color.toString())
      tempColor1.setAlpha(0)
      tempColor2.setAlpha(150)
      if(letter.color != "black"){
        setGradient(x + letter.x, y + letter.y, textWidth(letter.text), this.size*.80, tempColor1, tempColor2);
      }
    }
    textAlign(LEFT, TOP)
    textFont(this.font)
    textSize(this.size)
    fill(letter.color)
    text(letter.text, x + letter.x, y + letter.y)
  }
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
