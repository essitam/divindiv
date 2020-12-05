// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 12;
var angleDistortion = 0;
var letters = "hee hee hee! jijiji! yayaya! ee! eie ei YUPiiii ! ja ja jiji! 'beeh' jajaja  ay! ya ya yayeee! wrrrrrr   yesszzZZZZZZzz     Spazeistheplace  jahjahjah yoohoo! YupEee! kuku  furikuri   SpLaSH ";




// Drawing variables
var canvasadam;
var context;
var mouse = {x: 0, y: 0, down: false}

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function init() {
  canvasadam = document.getElementById( 'canvasadam' );
  context = canvasadam.getContext( '2d' );
	
  canvasadam.width = window.innerWidth;
  canvasadam.height = window.innerHeight;
	
  
  canvasadam.addEventListener('mousemove', mouseMove, false);
  canvasadam.addEventListener('mousedown', mouseDown, false);
	
	
  canvasadam.addEventListener('mouseup',   mouseUp,   false);
  canvasadam.addEventListener('mouseout',  mouseUp,  false);  
  canvasadam.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvasadam.width = window.innerWidth;
    canvasadam.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}





function randomColor() {
 var r = 255 * Math.random() | 0;
 var g = 255 * Math.random() | 0;
 var b = 255 * Math.random() | 0;
 return 'rgb(' + r + ',' + g + ',' + b + ')';
}



function draw() {
	
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d; // d/4 was original;
	 
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Arial";
		context.fillStyle = randomColor();
    
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle);
      context.fillText(letter,150,90); //this does awesome shifts to the text. // (letter, 110,0)  --- and 0,110   --- 210, 50 also heavily offsets the middle.  110,90
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
    //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  //document.getElementById('info2').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvasadam.width = canvasadam.width; 
}

function textWidth( string, size ) {
  context.font = size + "px Arial";
	 
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

init();