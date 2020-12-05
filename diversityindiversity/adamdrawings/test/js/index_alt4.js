/*
p5.js noise
https://codepen.io/enxaneta/pen/7e315d161a8ee073ded48ab5d1669290?editors=0110
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 1200,
  cx = cw / 2;
var ch = canvas.height = 800,
  cy = ch / 2;
//ctx.shadowBlur = 6;
//ctx.shadowOffsetX = .5;
//ctx.shadowOffsetY = .5;
//ctx.shadowColor = "#fff";
ctx.globalAlpha= 0.6;
ctx.fillStyle = randomColor(); //this has been added. each time you refresh a new color will be used to fill the circles. 

function randomColor() {
  var r = 255 * Math.random() | 0;
  var g = 255 * Math.random() | 0;
  var b = 255 * Math.random() | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}


var drawing = false;

var particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.xoff = x;
  this.yoff = 5;
  this.r = random(10, 40);  // this increases/decreases size of particles
  this.xIncr = noise(this.xoff) * 3; //this expands the space between the circles. 
  this.yIncr = noise(this.yoff) * 3;
  this.rDecr = random(2, 35) / 15; // make the first number '13' a smaller number and it will drift down farther. this is the random number selection for the number of copies it makes before the origin mousexy position // 2, 35 is a good ration.
  this.pnx = Math.random() > 0.5 ? -1 : 1; //-10 // the old ratio was -1 : 1  - but this cause a slight tilt in the drip (created by the y bias below) //however, when i made the last number 0.1 then it the drip happened completely downward. decided i don't like that as much but.. it's worth remembering. 
  this.pny = Math.random() > 0.5 ? -1 : 4;  //-5 // this bias created when the last number is 4, is key to the drip. you need the random to be large about, but also this 4 bias
  this.draw = function() {
    if (this.r > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
      //ctx.stroke();
    }
  }
  this.update = function() {
    this.x += noise(this.xoff) * this.xIncr * this.pnx;
    this.y += noise(this.yoff) * this.yIncr * this.pny;
    this.r -= this.rDecr;

  }
}

function Draw() {
  requestId = window.requestAnimationFrame(Draw);
  //ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.update();
    p.draw();
    p.xoff += .15;
    p.yoff += .15;
  }

}
Draw();

canvas.addEventListener("mousedown", function(evt) {
  drawing = true;
  //ctx.clearRect(0, 0, cw, ch);  //commenting this out keeps the drawing from clearing, on the mouse up
ctx.fillStyle = randomColor();	
  particles.length = 0;
  m = oMousePos(canvas, evt);
  var p = new Particle(m.x, m.y);
  particles.push(p);
}, false);

var k = 0;
canvas.addEventListener("mousemove", function(evt) {

  if (drawing) {
    m = oMousePos(canvas, evt);
    var p = new Particle(m.x, m.y);
    particles.push(p);

  }
  k++
}, false);

canvas.addEventListener("mouseup", function(evt) {
  drawing = false;
}, false);

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function random(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

/*clear.addEventListener("click", function(evt) {
  drawing = false;
  ctx.clearRect(0,0,cw,ch);
  particles.length = 0;
}, false);*/