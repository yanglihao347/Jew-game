const imageMap = {
  ball1: './images/redball.png',
  ball2: './images/blackball.png',
  bg: './images/bg1.png',
};

const transImage = (image) => {
  const img = new Image();
  img.src = imageMap[image];
  return img;
};

const bg = transImage('bg');

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
      return ball;
    });
  }
}

class Ball {
  constructor(x, y) {
    this.status = 0;
    this.x = x;
    this.y = y;
    this.image = this.status === 0 ? transImage('ball1') : transImage('ball2');
  }
  initBall() {}
  changeStatus() {
    this.status = 1;
    this.image = this.status === 0 ? transImage('ball1') : transImage('ball2');
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = document.getElementById('canvas').getContext('2d');
  }
  draw() {
    this.context.clearRect(0, 0, 610, 610);
    this.drawbg().then(() => {
      this.drawBallList();
    });
  }
  drawbg() {
    return new Promise((resolve) => {
      if (bg.complete) {
        this.context.drawImage(bg, 0, 0);
        console.log(123);
        resolve();
      } else {
        bg.onload = () => {
          console.log(456);
          this.context.drawImage(bg, 0, 0);
          resolve();
        };
      }
    });
  }

  drawBall(ball) {
    const x = (ball.x - 1) * 100 + 10;
    const y = (ball.y - 1) * 100 + 10;

    if (ball.image.complete) {
      this.context.drawImage(ball.image, x, y);
    } else {
      ball.image.onload = () => {
        this.context.drawImage(ball.image, x, y);
      };
    }
  }

  drawBallList() {
    this.ballList.map((ball) => {
      this.drawBall(ball);
    });
  }

  init() {
    this.scene = new Scene();
    this.ballList = this.scene.initBallList();
    this.draw();

    this.canvas.addEventListener('click', (e) => {
      const x = Math.floor(e.offsetX / 100) + 1;
      const y = Math.floor(e.offsetY / 100) + 1;
      this.ballList.map((ball) => {
        if (ball.x === x && ball.y === y) {
          ball.changeStatus();
          this.draw();
        }
      });
    });
  }

  gameOver() {}
}

const game = new Game();
game.init();
