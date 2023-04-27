let menuItems = ["Start Game", "How To Play", "Credits"];
let title = "Can I Erase";
let scale

class Menu {
    constructor() {
        this.isVisible = true
        this.ctx = createGraphics(width, height)
        this.ctx.textFont(menuFont)
        this.selectedMenuItem = 0
        this.renderText = this.menuText
    }

    resize(w, h) {
        let tempCtx = createGraphics(w, h);
        tempCtx.image(this.ctx, 0, 0, tempCtx.width, tempCtx.height);
        this.ctx = tempCtx;
        this.ctx.textFont(menuFont)
    }

    titleText() {
        push()
        this.ctx.textSize(scale / 7);
        this.ctx.textAlign(CENTER, CENTER);
        this.ctx.fill(255);
        this.ctx.text(title, this.ctx.width / 2, this.ctx.height / 4);
        pop()
    }

    menuText() {
        push()
        this.ctx.textSize(scale / 16);
        this.ctx.textAlign(CENTER, CENTER);
        for (let i = 0; i < menuItems.length; i++) {
            if (i === this.selectedMenuItem) {
                //Highlights the selected menu item
                if (frameCount % 30 < 20) {
                    this.ctx.fill(255, 0, 0);
                }
            } else {
                this.ctx.fill(255);
            }
            this.ctx.text(menuItems[i], this.ctx.width / 2, this.ctx.height / 2 + i * scale / 15);
        }
        this.titleText();
        pop()
    }

    // optionsText() {
    //     push()
    //     this.ctx.textSize(scale / 20);
    //     this.ctx.textAlign(CENTER, CENTER);
    //     this.ctx.fill(255);
    //     this.ctx.text("Options", this.ctx.width / 2, this.ctx.height / 3.5);
    //     this.ctx.text("Mute", this.ctx.width / 2, this.ctx.height / 2);
    //     pop()
    // }

    howToPlayText() {
        push()
        this.ctx.textSize(scale / 20);
        this.ctx.textAlign(CENTER, CENTER);
        this.ctx.fill(255);
        this.ctx.text("How to Play", this.ctx.width / 2, this.ctx.height / 3.5);
        this.ctx.text("- Type as fast as you can!", this.ctx.width / 2, this.ctx.height / 2);
        this.ctx.text("- Avoid the eraser!", this.ctx.width / 2, this.ctx.height / 2 + scale / 15);
        this.ctx.text("- Level up by completing each sentence!", this.ctx.width / 2, this.ctx.height / 2 + 2 * scale / 15);
        pop()
    }

    creditsText() {
        push()
        this.ctx.textSize(scale / 20);
        this.ctx.textAlign(CENTER, CENTER);
        this.ctx.fill(255);
        this.ctx.text("Credits", this.ctx.width / 2, this.ctx.height / 3.5);
        this.ctx.text("Jonathan Edey", this.ctx.width / 2, this.ctx.height / 2);
        this.ctx.text("Richard Marquez", this.ctx.width / 2, this.ctx.height / 2 + scale / 15);
        this.ctx.text("Ethan Hou", this.ctx.width / 2, this.ctx.height / 2 + 2 * scale / 15);
        pop()
    }

    endText() {
        push()
        this.ctx.textSize(scale / 10);
        this.ctx.textAlign(CENTER, CENTER);
        this.ctx.fill(255);
        this.ctx.text("GAME OVER", this.ctx.width / 2, this.ctx.height / 3.5);
        this.ctx.text(`Score: ${currentGame.score()["Points"]}`, this.ctx.width / 2, this.ctx.height / 2);
        this.ctx.text(`Press enter to restart.`, this.ctx.width / 2, this.ctx.height / 1.5);
        pop()
    }

    render() {
        push()
        scale = min(windowWidth, windowHeight) * 1.35
        if (this.isVisible) {
            this.ctx.clear()
            this.ctx.background(color(0, 0, 0, 0));
            this.renderText();
            push()
            fill(25)
                // rect(screen.x, screen.y, screen.w, screen.h)
            pop()
            image(this.ctx, screen.x, screen.y, screen.w, screen.h);
        }
        pop()
    }

    toggle() {
        this.isVisible = !this.isVisible
    }

    keyPressed() {
        if (currentGame.gameState == GameState.IDLE) {
            click.play()
            if (this.renderText == this.menuText) {
                //Up arrow key or "w" key press can be used to go up in the menu
                if (keyCode === UP_ARROW || keyCode === 87) {
                    this.selectedMenuItem--;
                    if (this.selectedMenuItem < 0) {
                        this.selectedMenuItem = menuItems.length - 1;
                    }
                    //Down arrow key or "s" key press can be used to down up in the menu
                } else if (keyCode === DOWN_ARROW || keyCode === 83) {
                    this.selectedMenuItem++;
                    if (this.selectedMenuItem >= menuItems.length) {
                        this.selectedMenuItem = 0;
                    }
                }
            }
            if (keyCode === ENTER) {
                //Menu Selection
                //"Enter" key press can be used to select an option in the menu
                //"Enter" to select an item on the menu
                if (this.selectedMenuItem === 0) {
                    //Start game
                    this.toggle()
                    currentGame.start()
                        // } else if (this.selectedMenuItem === 1) {
                        //Options
                        // this.renderText = this.optionsText
                } else if (this.selectedMenuItem === 1) {
                    //How to play game
                    this.renderText = this.howToPlayText
                } else if (this.selectedMenuItem === 2) {
                    //Credits
                    this.renderText = this.creditsText
                }
                //"Escape" key press can be used to go back to the main menu
            } else if (keyCode === 27) { //Escape key
                this.renderText = this.menuText
            }
        } else if (currentGame.gameState == GameState.END) {
            if (keyCode === ENTER) {
                click.play()
                currentGame.gameState = GameState.IDLE
                this.renderText = this.menuText
            }
        }
    }
}