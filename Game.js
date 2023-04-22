/**
 * TODO: 
 * WPM
 * - Time the user to see how long it takes to tpe the sentence
 * - Count the words in the sentence 
 * Visability
 * - Increase difficulty through text visiability. ie as time progresses erase the board.
 * Sound Effects
 * - Add more types of feedback when typing
 */

let randomWords
let url = "https://techy-api.vercel.app/api/json"

const GameState = {
  "IDLE": "IDLE",
  "PLAYING": "PLAYING",
  "END": "END"
}

const GameMode = {
  "WORDS": "WORDS",
  "SENTENCES": "SENTENCES"
}

function preload() {
  randomWords = loadJSON('./words.json');
}

class Game {
  constructor(mode = GameMode.SENTENCES, timeLimit = 60, timeLevelDec = 5){
    this.timeLimit = timeLimit
    this.timeLevelDec = timeLevelDec
    this.gameMode = mode
    this.gameState = GameState.IDLE

    this.points = 0
    this.level = 0
    this.wpm = 0
    this.startingTime = 0

    this.timer = 0
    this.loading = true
  }

  loadText() {
    this.loading = true
    switch(this.gameMode){
      case GameMode.SENTENCES:
        httpGet(url,"json",false, function(response){
          this.currentWord = new Sentence(response.message)
          this.loading = false
        }.bind(this))
      
      case GameMode.WORDS:
        this.currentWord = new Sentence(random(Object.values(randomWords)))
        this.loading = false
    }
  }

  stateManager() {
    if(this.gameState == GameState.PLAYING) {
      this.timer = this.startingTime - time
      if(!this.loading && this.currentWord.complete) {
        this.setupLevel()
      } else if(this.timer <= 0){
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
      if(!this.loading){
        this.currentWord.render(100,100)
      }
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
    this.loadText()
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

