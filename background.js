class Background {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width ;
		this.h = this.ctx.canvas.height ;
        this.img = new Image();
        this.img.src = "./images/background.png";
        this.isReady = false;
		this.img.onload = () => {
		  this.isReady = true;

        }
        this.vx = 0;
        this.directions = {
            left: false,
            right: false
        };
     }


    draw() {
        if (this.isReady) {
 
			this.ctx.drawImage(this.img, this.x - this.ctx.canvas.width, this.y, this.w, this.h);
			this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            this.ctx.drawImage(this.img, this.x + this.ctx.canvas.width, this.y, this.w, this.h);
        }     
        
     }

     move() {
        this.x += this.vx;

		if (this.directions.left) {
			this.vx = 5
		} else if (this.directions.right) {
			this.vx = -5
		} else {
			this.vx = 0;
		}

		if (this.x + this.ctx.canvas.width <= 0 || this.x >= this.ctx.canvas.width) {
			this.x = 0;
		}
    }

    onKeyEvent(event) {
		const isKeyDown = event.type === 'keydown';


        if (event.keyCode === 37) {
			this.directions.left = isKeyDown;
		} else if (event.keyCode === 39) {
			this.directions.right = isKeyDown;
		}
	}

}