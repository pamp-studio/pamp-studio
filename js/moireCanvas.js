var square = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -10;
canvas.style.backgroundColor = 'transparent';

var ctx = canvas.getContext('2d');
ctx.strokeStyle = globalRandomColor;

var lines = [];

document.body.append(canvas);

var increment = 19;

var started = false;
canvas.onmousedown = function(e) {
    if(!started){
    started = true;
    }
    increment = increment + 5;

 draw(e);
}

canvas.onclick = function(e){
    moving(e);  
    draw;
}

var mousemoves = 0;
window.onmousemove = function(e) {
    setTimeout(function(){
        moving(e);
        draw(e);
    },15)
    
}

canvas.ontouchmove = function(e) {
    moving(e);
    draw(e);
}

function moving(e){
    var ogStrokeStyle = globalRandomColor;
    lines.forEach(function(line){
        if(ctx.isPointInStroke(line, e.clientX, e.clientY)){
            ctx.strokeStyle = 'black';
            }
            ctx.stroke(line);
            ctx.strokeStyle = ogStrokeStyle;
    })
}

function draw(e){

    if(e!=undefined){
    startX = e.clientX;
    startY = e.clientY;
    }
    else{
        startX = window.innerWidth/2;
        startY = window.innerHeight/2;
    }

lines = [];

ctx.clearRect(0, 0, window.innerWidth,window.innerHeight);

// moire inspiration https://thinkspacestudio.com/tutorials/moire_loops_in_java
   // ctx.beginPath(); 

	// loop from left to right:
	for ( var x = 0; x <= window.innerWidth; x = x + increment ) {

        var line = new Path2D();
        line.moveTo(startX,startY);
        line.lineTo(x, 0); // draw line to the top
        var dx = startX - x;         
        var dy = startY - 0;         
        line.length = Math.sqrt(dx*dx + dy*dy); 
        ctx.stroke(line);
        lines.push(line);

        var line2 = new Path2D();
        line2.moveTo(startX,startY);
        line2.lineTo(x, window.innerHeight); // draw line to the bottom
        var dx = startX - x;         
        var dy = startY - 0;         
        line2.length = Math.sqrt(dx*dx + dy*dy); 
        ctx.stroke(line2, 'evenodd');
        lines.push(line2);
	}

	// loop from top to bottom::
	for ( var y = increment; y < window.innerHeight; y = y + increment ) {
        var line = new Path2D();

        line.moveTo(startX,startY);
        line.lineTo(0,y); // draw line to the top
        var dx = startX - 0;         
        var dy = startY - y;         
        line.length = Math.sqrt(dx*dx + dy*dy); 
        ctx.stroke(line);
        lines.push(line);
        var line2 = new Path2D();

        line2.moveTo(startX,startY);
        line2.lineTo(window.innerWidth,y); // draw line to the bottom
        var dx = startX - 0;         
        var dy = startY - y;         
        line2.length = Math.sqrt(dx*dx + dy*dy); 
        ctx.stroke(line2);
        lines.push(line2);
	}

}

draw();
var moireResizeTimeout = null;
window.onresize = function(e){
    if (moireResizeTimeout!=null){
      //  clearTimeout(moireResizeTimeout);
    }
    moireResizeTimeout = setTimeout(function(){
        draw();
    },2000)
}