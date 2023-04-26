let menuItems = ["Start Game", "Options", "How To Play", "Credits"];
let title = "Can I Erase";
let scale

class Menu{
  constructor() {
    this.isVisible = true
    this.ctx = createGraphics(width,height)
    this.ctx.textFont(menuFont)
    this.selectedMenuItem = 0
  }

  resize(w,h){
    let tempCtx = createGraphics(w, h);
    tempCtx.image(this.ctx, 0, 0, tempCtx.width, tempCtx.height);
    this.ctx = tempCtx;
    this.ctx.textFont(menuFont)
  }

  titleText() {
    push()
    this.ctx.textSize(scale/7);
    this.ctx.textAlign(CENTER,CENTER);
    this.ctx.fill(255);
    this.ctx.text(title, this.ctx.width / 2, this.ctx.height / 4);
    pop()
  }

  menuText() {
    push()
    this.ctx.textSize(scale/16);
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
      this.ctx.text(menuItems[i], this.ctx.width / 2, this.ctx.height / 2 + i * scale/15);
    }
    pop()
  }

  render() {
    push()
    scale = min(windowWidth, windowHeight)*1.35
    if(this.isVisible){
      this.ctx.clear()
      this.ctx.background(color(0,0,0,0));
      this.titleText();
      this.menuText();
      push()
      fill(25)
      // rect(screen.x, screen.y, screen.w, screen.h)
      pop()
      image(this.ctx, screen.x, screen.y, screen.w, screen.h);
    }
    pop()
  }

  toggle(){
    this.isVisible = !this.isVisible
  }

  keyPressed() {
    //Up arrow key or "w" key press can be used to go up in the menu
    if (keyCode === UP_ARROW || keyCode === 87) {
      this.selectedMenuItem--;
      if (this.selectedMenuItem < 0) {
        this.selectedMenuItem = menuItems.length - 1;
      }
      //Down arrow key or "s" key press can be used to down up in the menu
    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      //
      this.selectedMenuItem++;
      if (this.selectedMenuItem >= menuItems.length) {
        this.selectedMenuItem = 0;
      }
      //Menu Selection
      //"Enter" key press can be used to select an option in the menu
    } else if (keyCode === ENTER) {
      //Enter to select an item on the menu
      if (this.selectedMenuItem === 0) {
        //Start game
        this.toggle()
        currentGame.start()
      } else if (this.selectedMenuItem === 1) {
        //Options
      } else if (this.selectedMenuItem === 2) {
        //How to play game
      } else if (this.selectedMenuItem === 3) {
        //Credits
      }
    }
  }
}