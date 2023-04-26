const letterState = {
  "WRONG": "WRONG",
  "RIGHT": "RIGHT",
  "INCOMPLETE": "INCOMPLETE"
}

class Sentence {
  constructor(string, size = scale/30, x = 0, y = 0, font = myTextFont) {
    this.string = [...string]
    this.colors = {
      "WRONG": color("red"), 
      "RIGHT": color("#2E8BC0"),
      "INCOMPLETE": color("white")
    }
    this.size = size
    this.x = x
    this.y = y
    this.font = font
    this.index = 0
    this.end = false
    this.complete = false

    this.letters = this.split(this.string)
    this.lastErased = 0
  }

  set currentIndex(index) {
    if(index <= this.letters.length && index >= 0){
      if(index == this.letters.length){
        this.end = true
        let count = 0
        for(let l of this.letters) {
          if (l.color.toString() == this.colors.WRONG.toString()){
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

  erase(index) {
    // Get the last erased and returns it's x and y
    if(index >= this.lastErased){
      for(let i = this.lastErased; i <= index; i++)
        this.letters[i].isVisible = false
      this.lastErased = index
    }
    return this.letters[this.lastErased]
  }

  /**
   * Creates a list of renderable letters
   * @param {string} string 
   * @returns an array of letter objects
   */
  split(string) {
    push()
    let letters = []
    let letterWidth
    let tempWords = ""
    let tempString = ""
    let xOffset = 0
    let yOffset = 0
    let textBound
    textSize(this.size)
    textFont(this.font)
    // noFill()
    // stroke("red")
    // rectMode(CORNER)

    let index = 0
    for(let word of string.join("").split(/(\s+)/)){
      tempWords += word
      // If word does not fit on line go to the next one.
      textBound = this.font.textBounds(tempWords, screen.x,screen.y)
      if(textBound.w > screen.w){
        yOffset += scale/30
        xOffset = 0
        tempString = ""
        tempWords = word
      }
      for(let l of word){
        index+=1
        letterWidth = textWidth(l)
        tempString += l
        textBound = this.font.textBounds(tempString)
        // rect(textBound.x,(textBound.y+yOffset+scale/30),textBound.w,textBound.h)
  
        letters.push({
          index: index,
          text: l,
          color: this.colors.INCOMPLETE,
          isVisible: true,
          x: xOffset,
          // y: l == " " ? (textBound.y+yOffset+scale/30) : yOffset,
          // y: textBound.y+yOffset+scale/30,
          y: yOffset,
          width: letterWidth
        })
        xOffset += letterWidth
      }
    }
    pop()
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
      if(letter.isVisible) {
        this.drawLetter(letter, x, y)
      }
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
    push()
    textSize(this.size)
    textFont(this.font)
    // Checks if the letter is a space and was entered correctly
    // if(letter.text == " " && letter.color.toString() != this.colors.INCOMPLETE.toString()){
    if(letter.color.toString() != this.colors.INCOMPLETE.toString()){
      noStroke();
      let tempColor1 = color(letter.color.toString())
      let tempColor2 = color(letter.color.toString())
      tempColor1.setAlpha(0)
      tempColor2.setAlpha(150)
      if(letter.color != letterState.INCOMPLETE){
        setGradient(x + letter.x, y + letter.y, textWidth(letter.text), this.size, tempColor1, tempColor2);
      }
    }
    textAlign(LEFT, TOP)
    textFont(this.font)
    textSize(this.size)
    fill(letter.color)
    text(letter.text, x + letter.x, y + letter.y)
    pop()
  }

  resize() {
    push()
    this.size = scale/30
    textSize(this.size)
    let xOffset = 0
    for(let [i,l] of this.letters.entries()){
      let letterWidth = textWidth(l.text)
      this.letters[i] = {
        ...l,
        x: xOffset,
        y: 0,
        width: letterWidth
      }
      xOffset += letterWidth
    }
    pop()
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
