class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.pokemon = new Pokemon(this.ctx, 200);
        this.bg = new Background(this.ctx, 0, 0);
        this.ashKetchumm = [
            new AshKetchum(this.ctx, 8400, 300, 30),
        ];
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
        
        this.sound = new Audio('music/juego_dentro.mp3');
        this.sound.volume = 0.4;
        this.winSound = new Audio('music/pikachu_pi_pikachu.mp3');
        this.ashSound = new Audio('music/ashpikachu.mp3');
        this.raySound = new Audio('music/ataque_pikachu.mp3');
        this.overSound = new Audio('music/gameover.mp3');
        this.overSound.volume = 0.4;
        this.gengarSound = new Audio('music/gengar.mp3');
        
    }
    
    
    start() {
        this.sound.play();
        
        this.intervalId = setInterval(() => {
            this.clear();
			this.move();
			this.draw();
            this.checkCollisions();
            this.tick++;
            if(this.tick % 80 === 0) {
                this.addEnemy();
            }
        }, 1000 / 60);
    }


    draw() {
        this.bg.draw();
        this.ashKetchumm.forEach(ashKetchum =>{
            ashKetchum.draw();
        });

        this.gengarBads.forEach(gengarBad => {
            gengarBad.draw();
        });
        this.rayos.forEach(rayo => rayo.draw());
        this.enemys.forEach(enemy => {
            enemy.draw();
        });
        this.pokemon.draw();
        this.drawScore();
       
    }

    move() {
        this.bg.move();
        this.ashKetchumm.forEach(ashKetchum =>{
            ashKetchum.move();
        });
        this.gengarBads.forEach(gengarBad => {
            gengarBad.move();
        });
        this.rayos.forEach(rayo => rayo.move());
        this.enemys.forEach(enemy => {
            enemy.move(this.bg.vx);
        });
        this.pokemon.move();

    }



    clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.enemys = this.enemys.filter(enemy => enemy.y < this.ctx.canvas.height);
    }

    addEnemy() {
		const randomWidth = Math.random() * 10;
		const randomX = Math.random() * (this.ctx.canvas.width - randomWidth);
		const enemy = new Enemy(this.ctx, randomX, - this.pokemon.width, randomWidth);
		this.enemys.push(enemy);
	}


    onKeyDown(event) {
        this.ashKetchumm.forEach(ashKetchum => ashKetchum.onkeyEvent(event));
		this.pokemon.onKeyEvent(event);
		this.bg.onKeyEvent(event);
        this.gengarBads.forEach(gengarBad => gengarBad.onkeyEvent(event));

        if (event.keyCode === 38) {
            event.preventDefault();
            this.rayos.push(new Rayo(this.ctx, this.pokemon.x, this.pokemon.y + 40, 100));
          if (Math.round((Math.random()* 10)) <=5) {
            this.raySound.currentTime = 0;
            this.raySound.play();
          }
        }
       
	}

    onKeyUp(event) {
        this.ashKetchumm.forEach(ashKetchum => ashKetchum.onkeyEvent(event));
		this.pokemon.onKeyEvent(event);
		this.bg.onKeyEvent(event);
        this.gengarBads.forEach(gengarBad => gengarBad.onkeyEvent(event));
    }


    checkCollisions() {
        const collisioningBall = this.enemys.find(enemy => this.pokemon.isColliding(enemy))
        const collisioningAsh = this.ashKetchumm.find(ashKetchum => this.pokemon.isColliding(ashKetchum))
		const collisioningRayo = this.gengarBads.find(gengarBad => {
        
            return this.rayos.some(rayo => {
                return rayo.isColliding(gengarBad)
           })
        });

        if(collisioningAsh) {
            this.sound.pause();

            this.overSound.currentTime = 0;
            this.winSound.play();
            setTimeout(() => {
                this.ashSound.play();
            }, 1000);
            this.win();

        }
        
        if (collisioningBall) {
			this.score--;
            this.enemys.splice(this.enemys.indexOf(collisioningBall), 1)
		} else if (this.score === 0){
            
            this.sound.pause();
            this.overSound.currentTime = 0;
            this.overSound.play();
            this.gameOver();
        }

        if(collisioningRayo) {
           this.gengarBads.splice(this.gengarBads.indexOf(collisioningRayo), 1)
           this.rayos.splice(this.gengarBads.indexOf(collisioningRayo),1)
           this.score +=1;

           this.gengarSound.currentTime = 0;
           this.gengarSound.play();

        } else if (this.gengarBads.find(gengarBad => this.pokemon.isColliding(gengarBad))) {
            
            this.sound.pause();
            this.gengarSound.currentTime = 0;
            this.gengarSound.play();
            this.overSound.currentTime = 0;
            this.overSound.play();
            this.gameOver();
        }
        
	}


    drawScore() {
		this.ctx.fillStyle = '#000';
		this.ctx.font = '24px Arial';
		this.ctx.fillText("Score: " + this.score, 10, 30);
	}

    gameOver() {
		clearInterval(this.intervalId);
		this.ctx.fillStyle = "rgba(200, 0, 0, 0.4)";
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.fillStyle = "rgb(255, 255, 255)";
		this.ctx.font = "90px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillText("GAME OVER", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
	}

    win() {
        clearInterval(this.intervalId);
        this.ctx.fillStyle = "rgba(150, 0, 255, 1)";
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.fillStyle = "rgb(178, 34, 34)";
		this.ctx.font = "100px cursive";
		this.ctx.textAlign = "center";
		this.ctx.fillText("YOU WIN", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    }

}
