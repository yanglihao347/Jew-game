class Scene {
  constructor() {
    this.hori = 6;
    this.vert = 6;
    this.ballList = [];
  }
  initBallList() {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        this.ballList.push([i, j]);
      }
    }
    return this.ballList.map((ballPos) => {
      const ball = new Ball(ballPos[0], ballPos[1]);
      ball.initBall();
      return ball;
    });
  }
}

class Ball {
  constructor(x, y) {
    this.status = 0;
    this.x = x;
    this.y = y;
  }
  initBall() {
    const root = document.getElementById('root');
    const ballDiv = document.createElement('div');
    ballDiv.style.left = (this.x - 1) * 100 + 'px';
    ballDiv.style.top = (this.y - 1) * 100 + 'px';
    ballDiv.className = 'ball';
    ballDiv.addEventListener('click', () => {
      console.log(this.status, this.x, this.y);
      this.changeStatus();
    });
    root.appendChild(ballDiv);
    this.ballDiv = ballDiv;
  }
  changeStatus() {
    if (this.status === 0) {
      this.status = 1;
      this.ballDiv.className = 'ball test';
    } else {
      this.status = 0;
      this.ballDiv.className = 'ball';
    }
    console.log(this.ballDiv);
  }
}

class Game {
  constructor() {}

  init() {
    this.scene = new Scene();
    this.ballList = this.scene.initBallList();
    console.log(this.ballList);
  }

  gameOver() {}

  start() {}
}

const game = new Game();
game.init();
