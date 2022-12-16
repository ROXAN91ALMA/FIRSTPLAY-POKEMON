class Charizard {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.x = x;
        this.y = 50;
        this.width = 180,
        this.horizontalFrames = 4;
        this.verticalFrames = 1;
        this.xFrame = 0;
        this.yframe = 1;
        this.img = new Image();
        this.img.src = "./images/malo3.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * (this.img.height / this.verticalFrames) / (this.img.width / this.horizontalFrames);
        }
        this.tick = 0;
        this.ySpeed = 0;
        this.gravity = 0,4;
        this.fireballs = [];
        this.isMoving = {
            left: false,
            right: false,
        }
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
            this.fireballs.forEach((fireball) => fireball.draw());
            this.tick++;

            // cuando llegue a tick % 60  añado una bola de fuego a mi array de bolas de fuego
            if(this.tick % 80 === 0) {
                this.fireballs.push(
                    new Fireball(this.ctx, 580, 350, 50)
                  );
                   
            }
        

            if(this.tick % 20 === 0) {
                this.xFrame++;
               let framesToIterate = 2;
                if(this.isMoving) {
                    framesToIterate = 4;
                    this.yFrame = 4; 
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

        this.fireballs.forEach((fireball) => fireball.move());

        if(this.isMoving) {
            this.y = 380;
            this.yFrame = 0;
        
            if(this.tick % 10 === 0) {
                this.yFrame += 1;

                if(this.yFrame >= 1) {
                    this.yFrame = 0;
                }
            }

            if (this.y > this.ctx.canvas.height - 30 - this.height) {
                this.y = this.ctx.canvas.height - 30 - this.height;

            }
        
        } 

    }

    
    

    

    onkeyEvent(event)  {
		const isKeyDown = event.type === 'keydown';

		if (event.keyCode === 37) {
			this.isMoving.left = isKeyDown;
		} else if (event.keyCode === 39) {
			this.isMoving.right = isKeyDown;
		}
	}



}