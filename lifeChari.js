class LifeChari {
    constructor(ctx, y) {
        this.ctx = ctx;
        this.x = 900;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.img = new Image();
        this.img.src = "./images/fireballchari.png";
        this.isReady = false;
        this.img.onload = () => {
            this.isReady = true;
        };

    }

    draw() {
        if(this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}