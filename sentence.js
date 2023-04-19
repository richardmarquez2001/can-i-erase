
class Sentence {
  constructor(string, size = 18, x = 0, y = 0, font = "Georgia") {
    this.string = [...string.toLowerCase()]
    this.colors = ["red", "green", "black"]
    this.size = size
    this.x = x
    this.y = y
    this.font = font
    this.index = 0

    this.letters = this.split(this.string)
  }

  set currentIndex(index) {
    // can add validation
    if(index < this.letters.length && index >= 0){
      this.index = index
    }
    else {
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
    if(!this.colors.includes(color)){
      throw err
    }

    let letter = this.currentLetter
    letter.color = color

    this.currentIndex = this.currentIndex + 1
    print("INC")
    return letter
  }

  decrement() {
    let letter = this.currentLetter
    letter.color = this.colors[2]

    this.currentIndex = this.currentIndex - 1
    print("DEC", this.currentIndex)
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
        color: this.colors[2],
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
    if(letter.text == " " && letter.color != "black"){
      noStroke();
      // print(letter.color.toString())
      setGradient(x + letter.x, y + letter.y, textWidth(letter.text), 12, color(255,0,0,0), color(255,0,0,150));
    }
    textAlign(LEFT, TOP)
    textFont(this.font)
    textSize(this.size)
    fill(letter.color)
    text(letter.text, x + letter.x, y + letter.y)
  }
}
