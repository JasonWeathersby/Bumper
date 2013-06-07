
//Utility function to draw circles
function drawCirc(x, y, radius, r, g, b, a, context ){
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle =  'rgba('+r+','+g+','+b+','+a+')' ;
	context.fill();
	context.closePath();
}

//Main update to screen
function updateScreen(){

	//	if( document.visibilityState == "visible" ){
	//		screen.mozLockOrientation("landscape");
	//	}else{
	//		screen.mozUnlockOrientation();
	//	}

	BumperState.context.clearRect(0,0,BumperState.canvas.width, BumperState.canvas.height);
	BumperState.context.mozImageSmoothingEnabled = false;
	BumperState.context.font = '12pt Calibri';
	BumperState.context.fillStyle = 'white';
	var scoreMessage = "Score: " + BumperState.SCORE;
	var levelMessage = "Level: "+BumperState.LEVEL;
	var livesMessage="Lives: " +BumperState.LIVES;
	var xvelMessage="xvelocity: " +BumperState.xv ;
	var yvelMessage="yvelocity: " +BumperState.yv ;
	BumperState.context.fillText(scoreMessage,BumperState.canvas.width*.095, BumperState.canvas.height*.98 );
	BumperState.context.fillText(levelMessage,BumperState.canvas.width *.425, BumperState.canvas.height*.98 );
	BumperState.context.fillText(livesMessage,BumperState.canvas.width *.75, BumperState.canvas.height*.98 );
	//BumperState.context.fillText(xvelMessage,BumperState.canvas.width *.2, BumperState.canvas.height*.04 );	
	//BumperState.context.fillText(yvelMessage,BumperState.canvas.width *.2, BumperState.canvas.height*.09 );	
    
    //BumperState.context.lineWidth = 9;
    //BumperState.context.strokeStyle = "#34473D";
	//BumperState.context.strokeRect(0,0,BumperState.canvas.width,BumperState.canvas.height);
    //BumperState.context.lineWidth = 6;
    //BumperState.context.strokeStyle = "#024D25";
	//BumperState.context.strokeRect(0,0,BumperState.canvas.width,BumperState.canvas.height);	
	//Draw current hole and bumper configuration
	drawHoleAndBumpers();
	//Draw Cue at its current location
	drawCue(BumperState.currX,BumperState.currY,.8, BumperState.ballRadius);
	
	if( BumperState.bumperMessageCheck ){
		BumperState.context.font = '18pt Calibri';
		BumperState.context.fillStyle = 'white';
		var metrics = BumperState.context.measureText(BumperState.message);
      	var mWidth = metrics.width;
		var loc = BumperState.canvas.width/2 - mWidth/2;
	 	BumperState.context.fillText(BumperState.message, loc, BumperState.canvas.height/2 );
	}	
	
	
}

//Utility function for request animation
requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame
})();

//Utility function to cancel animation
cancelAnimationFrame = (function(){
  return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
})();
