
function bumper(x, y, radius){
	this.x = x;
	this.y =y;
	this.radius = radius;
}

bumper.prototype.getX =function(){
	return this.x;
}

bumper.prototype.getY =function(){
	return this.y;
}

bumper.prototype.getRadius =function(){
	return this.radius;
}

//Setup offscreen canvas for Bumper Animation Speed improvement
bumper.prototype.setupOffScreen = function(loopcount, alpha){
//offscreen canvas for creating bumpers
	var m_canvas = document.createElement('canvas');
	m_canvas.width = this.radius*2;
	m_canvas.height = this.radius*2;
	BumperState.bumperContext=m_canvas.getContext('2d');
	BumperState.bumperCanvas= m_canvas;

	var radius = this.radius;
	var alpha = alpha;
	loopcount = loopcount;
	var x = radius;
	var y = radius;
	drawCirc( x+1, y+1, radius, 0, 0, 0, 0.3, BumperState.bumperContext );
	for( var i=0; i<=loopcount; i++){
		var redval = 52-i*5;
		var greenval = 52-i*5;
		var blueval = 52-i*5;
		drawCirc( x, y, radius-i, redval, greenval, blueval, alpha-0.2, BumperState.bumperContext );
	}
	for( var i=1; i<=loopcount; i++){
		var redval = 200-i*5;
		var greenval = 220-i*5;
		var blueval = 220-i*5;
		drawCirc( x, y, radius-i-2, redval, greenval, blueval,alpha, BumperState.bumperContext );
	}

}

//Draw Bumper Image from offscreen
bumper.prototype.draw =function(loopcount, alpha ){

	if( BumperState.bumperCanvas == null ){
		this.setupOffScreen( loopcount, alpha );
	}
	BumperState.context.drawImage( BumperState.bumperCanvas, this.x-this.radius, this.y-this.radius)
}

//Setup offscreen canvas for hole image
function setupHoleCanvas(){
//offscreen canvas for creating hole
	var m_canvas = document.createElement('canvas');
	m_canvas.width = BumperState.holeRadius*2;
	m_canvas.height = BumperState.holeRadius*2;
	BumperState.holeContext=m_canvas.getContext('2d');
	BumperState.holeCanvas= m_canvas;
	var radius = BumperState.holeRadius;
	var x=radius;
	var y=radius;
	loopcount = 10;
	var redval = 50;
	var greenval = 50;
	var blueval = 50;
	drawCirc( x, y, radius-i-2, redval, greenval, blueval, 0.8, BumperState.holeContext );
	for( var i=0; i<loopcount; i++){
		var redval = 55-i*5;
		var greenval = 55-i*5;
		var blueval = 55-i*5;
		drawCirc(  x, y, radius-i, redval, greenval, blueval, 0.8, BumperState.holeContext );
	}
	

}

//Draw the hole and a bumper for each level
function drawHoleAndBumpers(){
//draw Shadow
	var radius = BumperState.holeRadius;
	loopcount = 10;
	var x = BumperState.canvas.width/2;
    var y = BumperState.canvas.height*0.2;
	if( BumperState.holeCanvas == null ){
		setupHoleCanvas();
	}
	BumperState.context.drawImage( BumperState.holeCanvas, x-radius, y-radius, radius*2, radius*2)
	for( var i=0; i< BumperState.LEVEL; i++){
		if( i <BumperState.levelCoordsX.length){
			if( BumperState.bumperArray[i] == null ){
				(BumperState.bumperArray[i] = new bumper( x+BumperState.levelCoordsX[i], y+ BumperState.levelCoordsY[i], BumperState.bumperRadius)).draw(1, 0.6);
			}else{
				BumperState.bumperArray[i].draw(1, 0.6);
			}
		}	
	}
	

}

//Check for bumper collision
function checkBumperCollision(){
	var xd=0;
	var yd=0;
	for( var i=0; i<BumperState.LEVEL;i++ ){
		if( i < BumperState.bumperArray.length ){
			xd = BumperState.currX - BumperState.bumperArray[i].getX();
			yd = BumperState.currY - BumperState.bumperArray[i].getY();
			
			//determine if ball and bumper have a collision
			var sumRadius = BumperState.ballRadius + BumperState.bumperRadius;
			var sqrRadius = sumRadius * sumRadius;
			var distSqr = (xd * xd) + (yd * yd);
			if (distSqr <= sqrRadius)
			{
			    var bs = new Audio("sounds/bumper3.wav");	
			    bs.play();
//uncomment to see angle of collision			    
//context.strokeStyle = "black";
//context.beginPath();
//context.moveTo(currX,currY);
//context.lineTo(bumperArray[i].getX(),bumperArray[i].getY());
//context.closePath();
//context.stroke();
//context.strokeStyle = "red";
				var nvecx = BumperState.currX - BumperState.bumperArray[i].getX();
				var nvecy = BumperState.currY - BumperState.bumperArray[i].getY();
				var oldMag = Math.sqrt( (BumperState.xv*BumperState.xv)+(BumperState.yv*BumperState.yv) );
				var newMag = Math.sqrt( (nvecx*nvecx)+(nvecy*nvecy));
				var lratio = oldMag/newMag;
				//set new direction and emulate friction
				BumperState.xv = nvecx*lratio*.85 ;
				BumperState.yv = nvecy*lratio*.85;
//uncomment to see calculate rebound vector
//context.strokeStyle = "blue";
//context.beginPath();
//context.moveTo(currX,currY);
//context.lineTo(currX+(xv*5),currY+(yv*5));
//context.closePath();
//context.stroke();
				return true;
			}
		}
	}		
    return false;
}


