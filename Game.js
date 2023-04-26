/**
 * TODO: 
 * Sound Effects
 * - Add more types of feedback when typing
 */

let apiUrl = "https://techy-api.vercel.app/api/json"
let gifUrl = "./assets/chatting.gif"

const GameState = {
  "IDLE": "IDLE",
  "PLAYING": "PLAYING",
  "END": "END"
}

const GameMode = {
  "WORDS": "WORDS",
  "SENTENCES": "SENTENCES"
}

class Game {
  constructor(mode = GameMode.SENTENCES, timeLimit = 60, timeLevelDec = 5){
    this.timeLimit = timeLimit
    this.timeLevelDec = timeLevelDec
    this.gameMode = mode
    this.gameState = GameState.IDLE

    this.currentText
    this.points = 0
    this.level = 0
    this.startingTime = 0
    this.gif = createImg(gifUrl);
    this.gif.position(screen.x,screen.y)
    this.gif.hide()

    this.timer = 0
    this.loading = true
  }

  resize() {
    if(this.currentText){
      this.currentText.resize()
    }
  }

  loadText() {
    this.loading = true
    switch(this.gameMode){
      case GameMode.SENTENCES:
        httpGet(apiUrl,"json",false, function(response){
          this.currentText = new Sentence(response.message)
          this.loading = false
        }.bind(this))
        break;
      case GameMode.WORDS:
        this.currentText = new Sentence(random(Object.values(randomWords)))
        this.loading = false
        break;
    }
  }

  stateManager() {
    if(this.gameState == GameState.PLAYING) {
      this.timer = (this.startingTime - time).toFixed(2)
      if(!this.loading){
        if(this.currentText.complete) {
          this.setupLevel()
        } else if(this.timer <= 0){
          this.end()
        } else {
          // Toggle letter visability based on timer
          let eraseIndex = Math.trunc(map(time / (this.startingTime/(this.currentText.letters.length-1)), (this.currentText.letters.length-1)/20,this.currentText.letters.length-1-(this.currentText.letters.length-1)/20,-1, this.currentText.letters.length-1, true))
          let lastLetter = this.currentText.erase(eraseIndex);
          this.gif.size(scale/25, scale/25); 
          this.gif.position(screen.x + (lastLetter.x + lastLetter.width - scale/25), screen.y + (lastLetter.y));


          // Alternative (Chunkier)
          // let eraseIndex = Math.trunc(map(this.timer, this.startingTime - (this.startingTime/20), this.startingTime/20, -1, this.currentText.letters.length-1,true))
          // print(eraseIndex,this.currentText.letters.length)
          // this.currentText.erase(eraseIndex)
        }
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
    // Determine if it render word
    if (this.stateManager() == GameState.PLAYING){
      if(!this.loading){
        this.currentText.render(screen.x,screen.y)
      }
    }
    pop()

    return this.score()
  }

  start() {
    this.points = 0
    this.gameState = GameState.PLAYING
    this.gif.show()
    this.level = 0
    this.startingTime = this.timeLimit

    this.setupLevel()
  }

  end() {
    this.gameState = GameState.END
    this.gif.hide()
    print("GAME OVER")
  }

  setupLevel() {
    this.points += float(this.timer)
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
      "RequiredWPM": this.wpm(this.currentText?.string.join(""), this.startingTime),
      "CurrentWPM": this.wpm(this.currentText?.string.slice(0,this.currentText?.currentIndex).join(""), this.startingTime-this.timer)

    }
  }

  wpm(string, time) {
    return string ? ((string=="" ? 0 : string.split(" ").length) * (60/time)).toFixed(2) : "-"
  }

  keyPressed(e) {
    // Prob some game state stuff
    if(this.gameState == GameState.PLAYING) {
      // inc and dec
      if(e.key == "Backspace"){
        this.currentText.decrement(letterState.INCOMPLETE)
      }
      else if(e.key == this.currentText.currentLetter.text) {
        this.currentText.increment(letterState.RIGHT)
        // Play good audio
        sfx2.setVolume(1)
        sfx2.play()
      }
      else if(e.key.length == 1){
        this.currentText.increment(letterState.WRONG) 
        // Play bad audio
        
        sfx2.setVolume(0.5)
        sfx2.play()
      } 
      else if(e.key == "Escape") {
        this.start()
      }
      // loop()
    }
  }
}

