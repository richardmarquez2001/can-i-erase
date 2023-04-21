/**
 * TODO: 
 * WPM
 * - Time the user to see how long it takes to tpe the sentence
 * - Count the words in the sentence 
 * Visability
 * - Increase difficulty through text visiability. ie as time progresses erase the board.
 */

function preload() {
  randomWords = loadJSON('./words.json');
}


const GameState = {
  "IDLE": "IDLE",
  "PLAYING": "PLAYING",
  "END": "END"
}

let randomWords

class Game {
  constructor(timeLimit = 60, timeLevelDec = 5){
    this.timeLimit = timeLimit
    this.timeLevelDec = timeLevelDec
    this.gameState = GameState.IDLE

    this.points = 0
    this.level = 0
    this.wpm = 0
    this.startingTime = 0

    this.timer = 0
  }

  stateManager() {
    if(this.gameState == GameState.PLAYING) {
      this.timer = this.startingTime - time
      if(this.currentWord.complete) {
        this.setupLevel()
      }else if(this.timer <= 0){
        this.end()
      }
    } else if(this.gameState == GameState.IDLE) {
      // print("Start game to render.")
    } else if(this.gameState == GameState.END) {
      // print("Restart Game")
    }
    return this.gameState
  }

  render() {
    push()
    background(220);
    // Determine if it render word
    if (this.stateManager() == GameState.PLAYING){
      // Render
      rect(100, 100, windowWidth-200, 200)
      this.currentWord.render(100,100)
    }
    pop()

    return this.score()
  }

  start() {
    this.points = 0
    this.gameState = GameState.PLAYING
    this.level = 0
    this.wpm = 0
    this.startingTime = this.timeLimit

    this.setupLevel()
  }

  end() {
    this.gameState = GameState.END
    print("GAME OVER")
  }

  setupLevel() {
    this.points += this.timer
    this.startingTime = this.timeLimit - ((this.level) * this.timeLevelDec)
    this.timer = this.startingTime
    frameCount = 0

    this.level += 1
    this.currentWord = new Sentence(random(Object.values(randomWords)))
  }

  score() {
    return {
      "Level": this.level,
      "Time": this.timer,
      "Start": this.startingTime,
      "Points": this.points,
      "State": this.gameState,

    }
  }

  // TODO: Figure this out
  wpm() {

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
    } else if(e.key == "Escape") {
      this.start()
    }
    // loop()
  }
}

