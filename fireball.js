class Fireball {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = 550;
        this.y = y;
        this.width= 50;
        this.height = 50;
        this.img = new Image();
        this.img.src = "./images/firechizard.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
        };

        this.speed = 4; 
    }

    draw() {
        if(this.isReady){
            this.ctx.drawImage(this.img, this.x, this.y * this.img.height / this.img.width);
        }
    }

    move() {
        this.x -= this.speed;
    }

    isColliding(pokemon) {
	
		return this.x < pokemon.x + pokemon.width
			&& this.x + this.size > pokemon.x
			&& this.y < pokemon.y + pokemon.height
			&& this.y + this.size > pokemon.y 
        }

        
}