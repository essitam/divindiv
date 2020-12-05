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
ctx.shadowBlur = 6;
ctx.shadowOffsetX = .5;
ctx.shadowOffsetY = .5;
ctx.shadowColor = "#fff";
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
  this.r = random(5, 40);  // this increases/decreases size of particles
  this.xIncr = noise(this.xoff) * 2; //this expands the space between the circles. 
  this.yIncr = noise(this.yoff) * 4;
  this.rDecr = random(3, 35) / 10;
  this.pnx = Math.random() > 0.9 ? -1 : 1; //-10
  this.pny = Math.random() > 0.9 ? -1 : 1;  //-5
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
  ctx.clearRect(0, 0, cw, ch);  //commenting this out keeps the drawing from clearing, on the mouse up
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
/*
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Resonance is an interbodily knowing, a betweenity that pervades. Autistics may resonate with watch other, but so too do they resonate with the nonhuman",10,50);
*/
/*clear.addEventListener("click", function(evt) {
  drawing = false;
  ctx.clearRect(0,0,cw,ch);
  particles.length = 0;
}, false);*/