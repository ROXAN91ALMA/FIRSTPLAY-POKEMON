class Enemy {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 40;
        //this.height = 30;
        this.img = new Image();
        this.img.src = "./images/pokebola.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * (this.img.height) / (this.img.width);
            
        };
        this.vy = 22;
    }


    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    move(bgSpeed) {
        if(this.isReady){
            this.y += this.vy;
            this.x -= bgSpeed
        }
    }
}