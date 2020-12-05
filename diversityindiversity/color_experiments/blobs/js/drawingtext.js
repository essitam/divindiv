// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 18;
var angleDistortion = 0;
var letters = "I am a lot of the time thinking about how to move. I want the art to have a feeling of boy’s assembling of really tough movement. I want good art about movement to give people the ideas of the way I don’t answer in words. I think that people ask questions to assembled ideas that always please them and hope sometimes that questions are backed by boy’s typing. I think that language is lost in the walk, not like want of the words that long for in the classroom. My art opens understandings of autism that feels relations with good people and my environment. Activating movement for me is because of the support the body has feeling with another body. I want art about movement to give people ideas about the way I don’t answer in words. Adam Wolfond";




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
    var fontSize = minFontSize + d/4;
	 
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Arial";
		context.fillStyle = "#333";
    
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle);
      context.fillText(letter,210,100); //this does awesome shifts to the text. // (letter, 110,0)  --- and 0,110   --- 210, 50 also heavily offsets the middle. 
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