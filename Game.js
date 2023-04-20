/**
 * TODO: 
 * Start:
 * - Setup game object
 * End
 * - Trigger end and ui
 * Score
 * - Export game state for ui on call
 * Time
 * - Implement time
 * WPM
 * - Time the user to see how long it takes to tpe the sentence
 * - Count the words in the sentence 
 * Level
 * - Increase difficulty through time 
 * Visability
 * - Increase difficulty through text visiability. ie as time progresses erase the board.
 */

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
    else if(e.key == this.currentWord.currentLetter.text) {
      this.currentWord.increment("green")
    }
    else if(e.key.length == 1){
      this.currentWord.increment("red")
    }
    loop()
  
  }
}

