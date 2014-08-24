//Standard Circular Light
function Light(ctx, radius, position)
{
     this.position = position;
     this.radius = radius;
     this.ctx = ctx;
     this.draw =  function(){
        var gradient = this.ctx.createRadialGradient(this.position.x, this.position.y, 
                                                     this.radius, this.position.x, this.position.y, 0);  
        gradient.addColorStop(1, "#000");  
         //gradient.addColorStop(0, "white");  
        gradient.addColorStop(0, "transparent");  
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 640, 480);  
     };
    this.place = function(x, y)
    {
        this.position.x = x;
        this.position.y = y;
    }

}

//Canvas
var gameCtx = document.getElementById('game').getContext("2d");
var darknessCanvas = document.getElementById('darkness');
var darknessCtx = darknessCanvas.getContext("2d");


//Test lights
var position = {x:50, y:50};
var light =  new Light(darknessCtx, 100, position);
light.draw();

//Test Text
gameCtx.fillStyle="red";
gameCtx.font="20px Georgia";
gameCtx.fillText("Hello World!",10,50);


//Game functions
function draw()
{
    //Fill the darkness out
    darknessCtx.globalCompositeOperation = 'source-over'; 
    darknessCtx.fillStyle = "black"; 
    darknessCtx.fillRect(0,0,640,480); 
    darknessCtx.globalCompositeOperation = 'destination-out'; 
    light.draw();
}
draw();

//Utility Functions
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
//Listeners 
darknessCanvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(darknessCanvas, evt);
    light.place(mousePos.x,mousePos.y);
    draw();
}, false);
