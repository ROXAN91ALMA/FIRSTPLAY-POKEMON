this.canvas = document.getElementById('canvas-play');


this.ctx = this.canvas.getContext("2d"); 

const game = new Game(ctx);
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', () => {
	game.start();
});

document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
});

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
});

  
  /*const leftBtn =document.getElementById('up-btn');
  leftBtn.addEvenListener('click', () => {
    game.up();
  });
  
  const enterBtn = document.getElementById('enter-btn');
  enterBtn.addEvenListener('click', () => {
    game.fireballs();
  });
  
  const rightBtn = document.getElementById('down-btn');
  rightBtn.addEvenListener('click', () => {
    game.down();
  });
  */
  
  
 /* window.addEventListener('load', function(event) {
    initCanvas();
  });
  */
  
