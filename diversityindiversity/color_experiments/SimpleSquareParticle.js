// Simple class example

function SimpleSquareParticle(posX, posY) {
		this.x = posX;
		this.y = posY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#FF0000";
		this.radius = 10; //only changing this makes no visible change. 
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SimpleSquareParticle.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - 10*this.radius)&&(hitX < this.x + 10*this.radius)&&(hitY > this.y - 10*this.radius)&&(hitY < this.y + 10*this.radius));
}

//A function for drawing the particle.
SimpleSquareParticle.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.radius, this.y - this.radius, 7*this.radius, 7*this.radius);
} //increases display size of squares but not the hit area. 