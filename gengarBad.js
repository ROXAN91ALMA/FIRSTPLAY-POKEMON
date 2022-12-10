class GengarBad {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.x = x;
        this.y = 350;
        this.width = 100,
        this.height = 90,
        this.img = new Image();
        this.img.src = "./images/gengar.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
        }
     
       this.speed = 0;

        this.tick = 0;

        this.directions = {
			left: false,
			right: false,
		};
    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(
            this.img,
            this.x, 
            this.y, 
            this.width, 
            this.height);
        }

        this.tick++;
    }


    move() {
       this.x += this.speed;

       if(this.tick % 3 === 0){
        this.x -= 5;
       }
    }

    onkeyEvent(event)  {
		const isKeyDown = event.type === 'keydown';

		if (event.keyCode === 37) {
			this.directions.left = isKeyDown;
		} else if (event.keyCode === 39) {
			this.directions.right = isKeyDown;
		}
	}

}