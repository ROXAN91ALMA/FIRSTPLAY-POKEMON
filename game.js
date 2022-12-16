class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.pokemon = new Pokemon(this.ctx, 200);
    this.bg = new Background(this.ctx, 0, 0);
    this.ashKetchumm = [new AshKetchum(this.ctx, 8400, 300, 30)];

    (this.charizardd = new Charizard(this.ctx, 600, 300, 30)),
    this.intervalId = null;
    this.enemys = [];
    this.rayos = [];
    this.tick = 0;
    
    this.gengarBads = [
      new GengarBad(this.ctx, 1000, 300, 30),
      new GengarBad(this.ctx, 1500, 300, 30),
      new GengarBad(this.ctx, 2000, 300, 30),
      new GengarBad(this.ctx, 2500, 300, 30),
      new GengarBad(this.ctx, 3000, 300, 30),
      new GengarBad(this.ctx, 3500, 300, 30),
      new GengarBad(this.ctx, 4000, 300, 30),
      new GengarBad(this.ctx, 4500, 300, 30),
      new GengarBad(this.ctx, 5500, 300, 30),
      new GengarBad(this.ctx, 5800, 300, 30),
      new GengarBad(this.ctx, 6000, 300, 30),
      new GengarBad(this.ctx, 6200, 300, 30),
      new GengarBad(this.ctx, 6500, 300, 30),
      new GengarBad(this.ctx, 6800, 300, 30),
      new GengarBad(this.ctx, 7100, 300, 30),
      new GengarBad(this.ctx, 7300, 300, 30),
      new GengarBad(this.ctx, 7600, 300, 30),
      new GengarBad(this.ctx, 7650, 300, 30),
      new GengarBad(this.ctx, 7720, 300, 30),
      new GengarBad(this.ctx, 7900, 300, 30),
      new GengarBad(this.ctx, 8100, 300, 30),
      new GengarBad(this.ctx, 8220, 300, 30),
      new GengarBad(this.ctx, 8270, 300, 30),
      new GengarBad(this.ctx, 8310, 300, 30),
    ];

    this.score = 5;

    /*this.lifeChariz = [
      new LifeChari(this.ctx, 20),
      new LifeChari(this.ctx, 60),
      new LifeChari(this.ctx, 100),
      new LifeChari(this.ctx, 140),
      new LifeChari(this.ctx, 180),
    ];*/

    this.sound = new Audio("music/juego_dentro.mp3");
    this.sound.volume = 0.4;
    this.winSound = new Audio("music/pikachu_pi_pikachu.mp3");
    this.ashSound = new Audio("music/ashpikachu.mp3");
    this.raySound = new Audio("music/ataque_pikachu.mp3");
    this.overSound = new Audio("music/gameover.mp3");
    this.overSound.volume = 0.4;
    this.gengarSound = new Audio("music/gengar.mp3");
  }

  start() {
    this.sound.play();

    this.intervalId = setInterval(() => {
      this.clear();
      this.move();
      this.draw();
      this.checkCollisions();
      this.tick++;
      if (this.tick % 80 === 0) {
        this.addEnemy();
      }
      /*if(this.tick % 80 === 0) {
                this.addCharizard();
            }*/
    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.ashKetchumm.forEach((ashKetchum) => {
      ashKetchum.draw();
    });

   /* if (this.lifeChariz.length) {
      this.charizardd.draw();
      
    } */

    /*this.charizardd.forEach((charizard) => {
        charizard.draw();
    });*/

    this.charizardd.draw();
      
    
    

    this.gengarBads.forEach((gengarBad) => {
      gengarBad.draw();
    });

    this.rayos.forEach((rayo) => rayo.draw());


    this.enemys.forEach((enemy) => {
      enemy.draw();
    });
    this.pokemon.draw();
    this.drawScore();
    //this.drawChar();

    /*this.lifeChariz.forEach((LifeChari) => {
      LifeChari.draw();
    });*/
  }

  move() {
    this.bg.move();
    this.ashKetchumm.forEach((ashKetchum) => {
      ashKetchum.move();
    });

    this.charizardd.move();

    this.gengarBads.forEach((gengarBad) => {
      gengarBad.move();
    });

    this.rayos.forEach((rayo) => rayo.move());


    this.enemys.forEach((enemy) => {
      enemy.move(this.bg.vx);
    });

    this.pokemon.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // this.enemys = this.enemys.filter(enemy => enemy.y < this.ctx.canvas.height);
    /*if(!this.lifeChariz.length) {
        console.log("esta vacio")
        this.charizardd.clearRect(new Charizard(this.ctx.canvas));
    }*/
  }

  addEnemy() {
    const randomWidth = Math.random() * 100 + 50;
    const randomX = Math.random() * (this.ctx.canvas.width - randomWidth);
    const enemy = new Enemy(
      this.ctx,
      randomX,
      -this.pokemon.width,
      randomWidth
    );
    this.enemys.push(enemy);
  }

  /*addCharizard() {
        console.log("helooooo");
        console.log("hellooooo")
        const randomSide = Math.random() * 100 + 50;
		const randomX = (Math.random() * this.ctx.canvas.width) + this.ctx.canvas.width/2;
        console.log({randomX})
		const charizard = new Charizard(this.ctx, randomX, this.pokemon.height, 300);
		this.charizardd.push(charizard);
    }*/

  onKeyDown(event) {
    this.ashKetchumm.forEach((ashKetchum) => ashKetchum.onkeyEvent(event));
    this.pokemon.onKeyEvent(event);
    this.bg.onKeyEvent(event);
    this.gengarBads.forEach((gengarBad) => gengarBad.onkeyEvent(event));
    this.charizardd.onkeyEvent(event);

    if (event.keyCode === 38) {
      event.preventDefault();
      this.rayos.push(
        new Rayo(this.ctx, this.pokemon.x, this.pokemon.y + 40, 100)
      );
      if (Math.round(Math.random() * 10) <= 5) {
        this.raySound.currentTime = 0;
        this.raySound.play();
      }
    }
  }

  onKeyUp(event) {
    this.ashKetchumm.forEach((ashKetchum) => ashKetchum.onkeyEvent(event));
    this.pokemon.onKeyEvent(event);
    this.charizardd.onkeyEvent(event);
    this.bg.onKeyEvent(event);
    this.gengarBads.forEach((gengarBad) => gengarBad.onkeyEvent(event));
  }

  checkCollisions() {
    const collisioningBall = this.enemys.find((enemy) =>
      this.pokemon.isColliding(enemy)
    );
    const collisioninGengar = this.gengarBads.find((gengarBad) =>
      this.pokemon.isColliding(gengarBad)
    );
    const collisioningAsh = this.ashKetchumm.find((ashKetchum) =>
      this.pokemon.isColliding(ashKetchum)
    );
    const collisioningRayo = this.gengarBads.find((gengarBad) => {
      return this.rayos.some((rayo) => {
        return rayo.isColliding(gengarBad);
      });
    });

    /*const collisioningFireballs = this.fireballs.find((fireball) =>
    this.pokemon.isColliding(fireball)
  );

  if (collisioningFireballs) {
    this.score--;
    this.fireballs.splice(this.fireballs.indexOf(collisioningBall), 1);
  }*/

    

    const collisioningRayo1 = this.rayos.find((rayo) => {
      return rayo.isColliding(this.charizardd);
    });

  

    if (collisioningAsh) {
      this.sound.pause();

      this.overSound.currentTime = 0;
      this.winSound.play();
      setTimeout(() => {
        this.ashSound.play();
      }, 1000);
      this.win();
    }

    if (collisioningBall) {
      this.score++;
      this.enemys.splice(this.enemys.indexOf(collisioningBall), 1);
    } else if (this.score === 0) {
      this.sound.pause();
      this.overSound.currentTime = 0;
      this.overSound.play();
      this.gameOver();
    }

    

    if (collisioningRayo) {
      this.gengarBads.splice(this.gengarBads.indexOf(collisioningRayo), 1);
      this.rayos.splice(this.gengarBads.indexOf(collisioningRayo), 1);
      this.score += 1;

      this.gengarSound.currentTime = 0;
      this.gengarSound.play();
    } else if (collisioninGengar) {
      this.gengarBads.find((gengarBad) => this.pokemon.isColliding(gengarBad));

      this.sound.pause();
      this.gengarSound.currentTime = 0;
      this.gengarSound.play();
      this.overSound.currentTime = 0;
      this.overSound.play();
      this.gameOver();
    }

    if (collisioningRayo1) {
      this.rayos.splice(this.rayos.indexOf(collisioningRayo1), 1);
     // this.lifeChariz.pop();
    }
  }

  drawScore() {
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.font = "22px Cursive";
    this.ctx.fillText("Score: " + this.score, 10, 30);
  }

  /*drawChar() {
    this.ctx.fillStyle = "#FFFAFA";
    this.ctx.font = " 22px Cursive";
    this.ctx.fillText("Life ", 850, 40);
  }*/

  gameOver() {
    clearInterval(this.intervalId);
    this.ctx.fillStyle = "rgba(200, 0, 0, 0.4)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.font = "90px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  win() {
    clearInterval(this.intervalId);
    this.ctx.fillStyle = "rgba(150, 0, 255, 1)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "rgb(178, 34, 34)";
    this.ctx.font = "100px cursive";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "YOU WIN",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}
