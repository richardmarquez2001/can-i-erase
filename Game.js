/**
 * TODO:
 * Sound Effects
 * - Add more types of feedback when typing
 */

let apiUrl = "https://techy-api.vercel.app/api/json";
let imgUrl = "./owl.jpg";

const GameMode = {
  WORDS: "WORDS",
  SENTENCES: "SENTENCES",
};

class Game {
  constructor(mode = GameMode.SENTENCES, timeLimit = 60, timeLevelDec = 5) {
    this.timeLimit = timeLimit;
    this.timeLevelDec = timeLevelDec;
    this.gameMode = mode;
    this.gameState = GameState.IDLE;

    this.currentText;
    this.points = 0;
    this.level = 0;
    this.startingTime = 0;
    this.yPos = 0;
    this.ySpeed = 2;
    this.img = loadImage("./assets/owl.jpg");
    if (this.yPos <= 0 || this.yPos + this.img.height >= height) {
      this.ySpeed *= -1;
    }
    image(this.img, 0, this.yPos);

    this.timer = 0;
    this.loading = true;
  }

  resize() {
    if (this.currentText) {
      this.currentText.resize();
    }
  }

  loadText() {
    this.loading = true;
    switch (this.gameMode) {
      case GameMode.SENTENCES:
        httpGet(
          apiUrl,
          "json",
          false,
          function (response) {
            this.currentText = new Sentence(response.message);
            this.loading = false;
          }.bind(this)
        );
        break;
      case GameMode.WORDS:
        this.currentText = new Sentence(random(Object.values(randomWords)));
        this.loading = false;
        break;
    }
  }

  stateManager() {
    if (this.gameState == GameState.PLAYING) {
      this.timer = (this.startingTime - time).toFixed(2);
      if (!this.loading) {
        if (this.currentText.complete) {
          this.setupLevel();
        } else if (this.timer <= 0) {
          this.end();
        } else {
          // Toggle letter visability based on timer
          let eraseIndex = Math.trunc(
            map(
              time /
                (this.startingTime / (this.currentText.letters.length - 1)),
              (this.currentText.letters.length - 1) / 20,
              this.currentText.letters.length -
                1 -
                (this.currentText.letters.length - 1) / 20,
              -1,
              this.currentText.letters.length - 1,
              true
            )
          );
          let lastLetter = this.currentText.erase(eraseIndex);

          this.img.resize(scale / 25, scale / 25);
          image(
            this.img,
            screen.x + (lastLetter.x + lastLetter.width - scale / 25),
            screen.y + screen.h / 3 + lastLetter.y + this.yPos
          );
          this.yPos += this.ySpeed * 2;

          if (this.yPos > 30 || this.yPos < 0) {
            this.ySpeed *= -1;
          }
        }
      }
    } else if (this.gameState == GameState.IDLE) {
      // print("Start game to render.")
    } else if (this.gameState == GameState.END) {
      // print("Restart Game")
    }
    return this.gameState;
  }

  render() {
    push();
    // Determine if it render word
    if (this.stateManager() == GameState.PLAYING) {
      if (!this.loading) {
        this.currentText.render(screen.x, screen.y + screen.h / 3);
      }
    }
    pop();

    return this.score();
  }

  start() {
    this.points = 0;
    this.gameState = GameState.PLAYING;
    this.level = 0;
    this.startingTime = this.timeLimit;
    setTimeout(() => {
      canierase.play();
    }, 1);

    this.setupLevel();
  }

  end() {
    this.gameState = GameState.END;
    mainMenu.renderText = mainMenu.endText;
    mainMenu.toggle();
    print("GAME OVER");
  }

  setupLevel() {
    this.points += float(this.timer);
    this.startingTime = this.timeLimit - this.level * this.timeLevelDec;
    this.timer = this.startingTime;
    frameCount = 0;

    this.level += 1;
    this.loadText();
  }

  drawStats(gameInfo, screen) {
    push();

    const currWPM = this.wpm(
      this.currentText?.string
        .slice(0, this.currentText?.currentIndex)
        .join(""),
      this.startingTime - this.timer
    );
    let levelText = `Level: ${this.level}`;
    let pointsText = `Points: ${this.points}`;
    let timerText = `Time: ${this.startingTime}`;
    let wpmText = `WPM: ${currWPM}`;
    let yOffset = 50;

    stroke("white");
    fill("white");
    myTextFont.textBounds(gameInfo, screen.w, screen.h);
    textSize(scale / 30);
    textFont(menuFont);
    
    text(
      `${levelText} ${pointsText} ${timerText} ${wpmText}`,
      screen.x,
      screen.y + yOffset
    );
    pop();
  }

  score() {
    return {
      Level: this.level,
      Time: this.timer,
      Start: this.startingTime,
      Points: this.points,
      State: this.gameState,
      RequiredWPM: this.wpm(
        this.currentText?.string.join(""),
        this.startingTime
      ),
      CurrentWPM: this.wpm(
        this.currentText?.string
          .slice(0, this.currentText?.currentIndex)
          .join(""),
        this.startingTime - this.timer
      ),
    };
  }

  wpm(string, time) {
    return string
      ? ((string == "" ? 0 : string.split(" ").length) * (60 / time)).toFixed(2)
      : "-";
  }

  keyPressed(e) {
    // Prob some game state stuff
    if (this.gameState == GameState.PLAYING) {
      // inc and dec
      if (e.key == "Backspace") {
        this.currentText.decrement(letterState.INCOMPLETE);
      } else if (e.key == this.currentText.currentLetter.text) {
        this.currentText.increment(letterState.RIGHT);
        // Play good audio
        rightKey.setVolume(1);
        rightKey.play();
      } else if (e.key.length == 1) {
        this.currentText.increment(letterState.WRONG);
        // Play bad audio
        click.setVolume(1);
        click.play();
      }
    }
  }
}
