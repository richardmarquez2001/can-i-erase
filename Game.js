class Game {
  constructor(){
    this.currentWord = new Sentence("Hell o World")
    // currentWord.increment("red")
    // currentWord.increment("red")
    // currentWord.increment("red")
  }

  render() {
    push()
    
    background(220);
    rect(100, 100, 100, 100)
    this.currentWord.render(100,100)
    print(this.currentWord.complete)

    pop()
  }

  keyPressed(e) {
    // Prob some game state stuff
  
    // inc and dec
    if(e.key == "Backspace"){
      this.currentWord.decrement("black")
    }
    else if(e.key.toLowerCase() == this.currentWord.currentLetter.text) {
      this.currentWord.increment("green")
    }
    else if(e.key.length == 1){
      this.currentWord.increment("red")
    }
    loop()
  
  }
}

