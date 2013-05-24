//Main file for game logic
window.onload = init;

//Setup function to reset start location
function setup(){
	BumperState.canvas = document.getElementById('myCanvas');
	BumperState.canvas.height= window.innerHeight;
	BumperState.canvas.width = window.innerWidth;
	BumperState.context = BumperState.canvas.getContext('2d');
	var rect = BumperState.canvas.getBoundingClientRect();
	BumperState.currX = BumperState.canvas.width/2;
	BumperState.currY = BumperState.canvas.height*0.8;
	BumperState.BALLSTARTX =  BumperState.currX;
	BumperState.BALLSTARTY = BumperState.currY;
	BumperState.ballMoving =false;
	BumperState.xv=0;
	BumperState.yv=0;
	BumperState.ballRadius=12;
	BumperState.bumperArray = [];
	updateScreen();
}
function moveBall( ){
	BumperState.bumperMessageCheck = false;
	BumperState.message = "";
	BumperState.anim = requestAnimationFrame(moveBall);
	BumperState.currX +=BumperState.xv;
	BumperState.currY +=BumperState.yv; 
	var hit =false;
	var stopped=false;

	//apply friction
	BumperState.yv*=.99;
	BumperState.xv*=.99;
	//Set final speed for a stop condition
	if(Math.sqrt(BumperState.xv*BumperState.xv + BumperState.yv*BumperState.yv) <= 0.2){
		stopped=true;
	}
	//Check to see if ball hit a bumper
	checkBumperCollision();
	//hit right wall
	if( (BumperState.currX + BumperState.ballRadius) >= BumperState.canvas.width ){
		BumperState.currX = BumperState.canvas.width-BumperState.ballRadius;
		BumperState.xv = -1*BumperState.xv;
		hit=true;
	}
	//hit left wall
	if( (BumperState.currX - BumperState.ballRadius) <= 0 ){
		BumperState.currX = 0+BumperState.ballRadius;
		BumperState.xv = -1*BumperState.xv;
		hit=true;
	}
	//top wall
	if( (BumperState.currY -BumperState.ballRadius) <= 0 ){
		BumperState.currY = 0+BumperState.ballRadius;	
		BumperState.yv = -1*BumperState.yv;
		hit=true;
	}
	//bottom Wall
	if( (BumperState.currY + BumperState.ballRadius) >= BumperState.canvas.height ){
		BumperState.currY = BumperState.canvas.height-BumperState.ballRadius;	
		BumperState.yv = -1*BumperState.yv;
		hit=true;
	}
	if( hit > 0 ){
		//play sound and apply friction;
		var ws = new Audio("sounds/wallbounce.wav");
		ws.play();
		navigator.vibrate(100);
		//BumperState.wallSound.play();
		BumperState.yv = BumperState.yv*.85;
		BumperState.xv = BumperState.xv*.85;
	}
	if( stopped ){
		BumperState.LIVES--;
		if( BumperState.LIVES <= 0 ){
			BumperState.bumperMessageCheck = true;
			BumperState.message = "You Lose";
			BumperState.LEVEL = 1;
			BumperState.SCORE = 0;
			BumperState.LIVES = 10;
		}
		
		BumperState.currX =BumperState.BALLSTARTX;
		BumperState.currY=BumperState.BALLSTARTY;
		BumperState.xv=0;
		BumperState.yv=0;
		BumperState.ballMoving=false;
		cancelAnimationFrame( BumperState.anim );
	}
	//Check to see if ball goes into hole
	if( cueSunk() ){
		cancelAnimationFrame(BumperState.anim);
		BumperState.sunkSound.play();
		sinkBall();
	}
	updateScreen();
}

//Funciton to handle shrinking ball as it goes into hole
function sinkBall(){
	BumperState.anim = requestAnimationFrame( sinkBall );
	BumperState.ballRadius=BumperState.ballRadius-1;
	var hx = BumperState.canvas.width/2;
    var hy = BumperState.canvas.height*0.2;
	var difX = (BumperState.currX-hx)/7;
	var difY = (BumperState.currY-hy)/7;
	if( BumperState.ballRadius <=8 ){
		BumperState.SCORE+=100;
		BumperState.LIVES=10;
		BumperState.LEVEL++;
		if( BumperState.LEVEL > 10 ){
			BumperState.bumperMessageCheck = true;
			BumperState.message = "You Win";		
			BumperState.LEVEL = 1;
			BumperSTate.SCORE = 0;
		}
		setup();
		cancelAnimationFrame(BumperState.anim);
		return;
	}else{
		updateScreen();
		if( difX < 0){
			BumperState.currX= BumperState.currX-difX;
		}else{
			BumperState.currX= BumperState.currX-difX;
		}
		if( difY < 0){
			BumperState.currY= BumperState.currY-difY;
		}else{
			BumperState.currY= BumperState.currY-difY;
		}
	}
}

//Function to check if ball goes into hole
function cueSunk(){
	var dx = BumperState.currX-BumperState.canvas.width/2;
	var dy = BumperState.currY-BumperState.canvas.height*0.2;
	//need to alter trajectory for a lip
	return(dx*dx+dy*dy <= (BumperState.holeRadius)*(BumperState.holeRadius));
}

//Check to see if ball is touched to start a slide
function checkGotCue( evt) {
	var rect = BumperState.canvas.getBoundingClientRect();
	var xsel;
	var ysel;
	if( BumperState.Touch ){	
		xsel = evt.targetTouches[0].clientX - rect.left;
		ysel = evt.targetTouches[0].clientY - rect.top;
	}else{	
		xsel = evt.clientX - rect.left;
		ysel = evt.clientY - rect.top;
	}	
	var dx = xsel-BumperState.BALLSTARTX;
	var dy = ysel-BumperState.BALLSTARTY;
	return ( !BumperState.ballMoving && dx*dx+dy*dy <= BumperState.ballRadius*BumperState.ballRadius*3);
}

//Slide ball based on how tragectory and length of drag
function slideBall(evt) {
	BumperState.ballMoving=true;
	var rect = BumperState.canvas.getBoundingClientRect();
	BumperState.xv = (BumperState.slideX -BumperState.BALLSTARTX)/20;
	BumperState.yv = (BumperState.slideY -BumperState.BALLSTARTY)/20;
	BumperState.slideX=BumperState.BALLSTARTX;
	BumperState.slideY=BumperState.BALLSTARTY;	
	moveBall();
}

//Set that the ball has been touched 
function startBallEvent(evt){
		var chk = checkGotCue(evt);
		if( chk ){
			BumperState.ballSelected = true;
		}else{
			BumperState.ballSelected = false;
		}
}

//Ball has been released and needs to start sliding
function stopBallEvent(evt){
		if( BumperState.ballSelected){
			slideBall(evt);
			BumperState.ballSelected =false;
		}

}

//Ball is being dragged.  Show alpha shadow of ball	
function ballMoveEvent(evt){
		if( BumperState.ballSelected){
			var rect = BumperState.canvas.getBoundingClientRect();
			var x;
			var y;
			if( BumperState.Touch ){	
				x=evt.targetTouches[0].clientX - rect.left;
				y=evt.targetTouches[0].clientY - rect.top;
			}else{	
				x = evt.clientX - rect.left;
				y = evt.clientY - rect.top;
			}
			if(( x < 5 || x > ( rect.right-10)) || ( y < 5 || y > ( rect.bottom-10))){
				BumperState.ballSelected = false;
				updateScreen();
				return;
			}
			updateScreen();
			BumperState.slideX = x;
			BumperState.slideY = y;
			drawCue( x, y, 0.15, BumperState.ballRadius);
		}
}	
	

//Initialize game and event handlers
function init(){

	BumperState.sunkSound = new Audio("sounds/cuesunk.wav");
	BumperState.sunkSound.load();   
	BumperState.wallSound = new Audio("sounds/wallbounce.wav");
	BumperState.wallSound.load();
	BumperState.bumperSound = new Audio("sounds/bumper3.wav");	
	BumperState.bumperSound.load();
	setup();
	var supportsTouch = ('ontouchstart' in window) ||
               window.DocumentTouch &&
               document instanceof DocumentTouch;
	if( supportsTouch ){
		BumperState.Touch = true;
		document.ontouchmove = ballMoveEvent;
		document.ontouchstart = startBallEvent;
		document.ontouchend = stopBallEvent;
	
	}else{
		BumperState.Touch = false;
		document.onmousemove = ballMoveEvent;
		document.onmousedown = startBallEvent;
		document.onmouseup = stopBallEvent;
	}
	window.addEventListener( 'resize', function(evt) {
		setup();
	}, false);
	
	

}
