class Rayo {
    constructor(ctx, x, y, size) {
        this.ctx = ctx;
        this.x = 300;
        this.y = y;
        this.size = size;
        this.img = new Image();
        this.img.src = "./images/pikachuSFRayo.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
        };

        this.speed = 4; 
    }

    draw() {
        if(this.isReady){
            this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size * this.img.height / this.img.width);
        }
    }

    move() {
        this.x += this.speed;
    }

    isColliding(gengarBad) {
	
		return this.x < gengarBad.x + gengarBad.width
			&& this.x + this.size > gengarBad.x
			&& this.y < gengarBad.y + gengarBad.height
			&& this.y + this.size > gengarBad.y 
        }
}