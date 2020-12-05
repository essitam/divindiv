// thanks to @aecend and @tmrDevelops for help with the code, and @XDBoy018 for starting the #canvas-club!

// variables
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");
var color = document.getElementById("color");
var mousedown = false;
var mouseup = true;
var sizeIncrement = 0; //not so impactful.
var size = 0.1;
var current = "draw";
var theColor;



// make the background color of the canvas be white
//canvas.style.backgroundColor = "white";

// make the squares larger...
function grow(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;

  while (mousedown = true && size < 40) {
    sizeIncrement++;
    size += sizeIncrement;
  } // on mouse down, this gives the max size shape drawn. 
//>> if i get rid of these things, nothing will be drawn on a simple mousedown. BUT if i keep it, it gives me an opportunity to draw something different. 
  //ctx.fillRect(mouseX, mouseY, size, size);  
 //ctx.fillStyle = randomColor();
	ctx.fillRect(mouseX, mouseY + (340 * Math.random()), 1 + (30* Math.random()), 1 + (20* Math.random()));  
  ctx.fillStyle = randomColor();
	
	ctx2.fillRect(mouseX+(900* Math.random()), mouseY + (340 * Math.random()), 110 + (10* Math.random()), 110 + (10* Math.random()));  
  ctx2.fillStyle = randomColor();
}

// ...and make them go back to normal size
function shrink(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;
  
  if (mouseup = true && size > 0.1) {
    size = 0.1; //this is how i'm faking it. i've reduced the size when the mouse isn't down, to so small you don't see it. the next step is to eliminate recognization of y-axis mouse position recognition, so that it will only draw a rectangle at the x-position
  }
}

// are we drawing with a random color, erasing, 
// or drawing with a specific color?

//this is where the fun is.
function tool(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;

  if (current == "draw") {
    ctx.fillStyle = randomColor();
    ctx.fillRect(20* Math.random(), -10, 300, size*20);//this is how i changed the cube into a rectangle.
	  
	  // when i change the 3rd variable to '2' it caused each new mouse down to shfit the secondary drawing down a bit. it's interesting -- keep it.
	  ctx2.fillStyle = randomColor();
    ctx2.fillRect(mouseX, 50, 10, 10);
  }
  else if (current == "erase") {
    ctx.clearRect(mouseX, mouseY, 300, 300);
	  //ctx2.clearRect(mouseX, mouseY, size, size);
  }
  else if (current == "color") {
    ctx.fillStyle = document.getElementById('color').value;
    ctx.fillRect(mouseX, 0, 0, 0); //this is how you keep it from drawing continuously, and instead only a mousedown. before it was size/4, size*20
	  ctx2.fillStyle = document.getElementById('color').value;
    ctx2.fillRect(mouseX+100, 0, 0, 0);
  }
}
 

// tell tool() what we're doing
function eraser() {
  current = "erase";
}

function draw() {
  current = "draw";
}

function setColor() {
  current = "color";
  theColor = document.getElementById('color').value;
}

// get a random color in rgb() format
function randomColor() {
  var r = 255 * Math.random() | 0;
  var g = 255 * Math.random() | 0;
  var b = 255 * Math.random() | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
  
  sizeIncrement = 1
  size = 0.1;
  ctx.fillStyle = randomColor();
	ctx2.fillStyle = randomColor();
  canvas.style.backgroundColor = "white";
}

// set a custom background color
function setbgColor() {
  canvas.style.backgroundColor = document.getElementById('color').value;
}

// take a picture of the canvas
function savePicture() {
    var canvas2 = document.createElement("canvas"); // create a temporary canvas
    var ctx2 = canvas2.getContext("2d"); // get its context
    canvas2.width = canvas.width; // set its width
    canvas2.height = canvas.height; // set its height

    ctx2.drawImage(canvas, 0, 0); // draw the main canvas onto it

    ctx.fillStyle = canvas.style.backgroundColor; // set the fillStyle to the CSS color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the main canvas that color
    ctx.fillStyle = theColor; // set the fillStyle back to what it was

    ctx.drawImage(canvas2, 0, 0); // draw the temporary canvas on top of the main one

    window.open(canvas.toDataURL()); // convert to image and open a window

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear main canvas
    ctx.drawImage(canvas2, 0, 0); // put original image back on main canvas
}

ctx.font = "14px Arial";
ctx.fillText("'To get anywhere with the concept [of affect], you have to retain the manyness of its forms. It's not something that can be reduced to one thing. Mainly because it's not a thing. It's an event, or a dimension of every event. What interests me in the concept is that if you approach it respecting its variety, you are presented with a field of questioning, a problematic field, where the customary divisions that questions about subjectivity, becoming, or the political are usually couched in do not apply. My starting point is the basic Spinozan definition of affect, which is an 'ability to affect or be affected.'",15,50);

// here's where we call functions
window.onload = draw;

canvas.addEventListener("mousedown", grow);
canvas.addEventListener("mouseup", shrink);
canvas.addEventListener("mousemove", tool);

document.getElementById("clear").onclick = clear;
document.getElementById("draw").onclick = draw;
document.getElementById("erase").onclick = eraser;
document.getElementById('set-color').onclick = setColor;
document.getElementById("random-color").onclick = draw;
document.getElementById("background-color").onclick = setbgColor;
document.getElementById("picture").onclick = savePicture;




