class Pokemon {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.x = x;
        this.y = 350;
        this.width = 150;
        this.horizontalFrames = 4;
        this.verticalFrames = 3;
        this.xFrame = 0;
        this.yFrame = 1;
        this.img = new Image();
        this.img.src = "./images/pikachuSFC_1.png"
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * (this.img.height / this.verticalFrames) / (this.img.width / this.horizontalFrames);
        }
        this.tick = 0;
        this.ySpeed = 0;
        this.gravity = 0,4;

        this.isMoving = {
            left: false,
            right: false,
        };
        this.isJumping = false;
    }


    draw() {
        if(this.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width / this.horizontalFrames) * this.xFrame,
				(this.img.height / this.verticalFrames) * this.yFrame,
				this.img.width / this.horizontalFrames,
				this.img.height / this.verticalFrames,
				this.x,
				this.y,
				this.width,
				this.height
            );
            this.tick++;

            if(this.tick % 10 === 0) {
                this.xFrame++;
                let framesToIterate = 2;
                if(this.isMoving) {
                    framesToIterate = 4;
                    this.yFrame = 0; 
                }else {
                    this.yFrame = 1;
                }
                if(this.xFrame >= framesToIterate) {
                    this.xFrame = 0;
                }   
            }
        }
    }

    move() {
        
		this.y += this.ySpeed;
		this.ySpeed += this.gravity;

        if(this.isMoving && !this.isJumping) {
            this.y = 380;
            this.yFrame = 0;
        
            if(this.tick % 10 === 0) {
                this.yFrame += 1;

                if(this.yFrame >= 1) {
                    this.yFrame = 0;
                }
            }
        
        } 

        if(this.isJumping){

            this.y = 350;
            this.xFrame = 2;
            this.yFrame = 2;
            

            if(this.tick % 10 === 0) {
                this.xFrame += 1;

                if(this.yFrame > 1) {
                    this.xFrame = 2;
                }
            }
        } /*else if(!this.isMoving && this.isJumping) {
            this.ySpeed -= 5;
            this.y = 400;
            this.yFrame += 1;

        }
*/

        if (this.y > this.ctx.canvas.height - 30 - this.height) {
			this.y = this.ctx.canvas.height - 30 - this.height;
			this.isJumping = false;
		}
        /*else{
               this.isJumping = true;
        }*/


        
	}

    onKeyEvent(event) {
		const isKeyDown = event.type === 'keydown';

        if(event.keyCode === 38 && !this.isJumping){
            this.isJumping = true;
            this.yspeed = -20;
        
        }

        if (event.keyCode === 37 || event.keyCode === 39) {
			this.isMoving = true;
		}

        if(!isKeyDown) {
            if (event.keyCode === 37 || event.keyCode === 39) {
                this.isMoving = false;
                this.xFrame = 0;
            }
        }


	}

    isColliding(enemy) {
		const threshold = 20;
		return this.x + threshold < enemy.x + enemy.width
			&& this.x + this.width > enemy.x + threshold
			&& this.y + threshold < enemy.y + enemy.height
			&& this.y + this.height > enemy.y + threshold;
	}

    checkCollisions() {

    const collisioningFireballs = this.fireballs.find((fireball) =>
    this.pokemon.isColliding(fireball)
  );

  if (collisioningFireballs) {
    this.fireballs.splice(this.fireballs.indexOf(collisioningBall), 1);
    this.score--;
  }
}
}