//Setup offscreen canvas for Ball Animation Speed improvement
function setupBallCanvas(){
	var m_canvas = document.createElement('canvas');
	m_canvas.width = (BumperState.ballRadius)*2;
	m_canvas.height = (BumperState.ballRadius)*2;
	m_context=m_canvas.getContext('2d');
	BumperState.ballContext= m_context;
	BumperState.ballCanvas= m_canvas;

	var radius = BumperState.ballRadius;
	x=radius;
	y=radius;
	a =.8;
	loopcount = 10;
	for( var i=0; i<loopcount; i++){
		var redval = 8;
		var greenval = 12;
		var blueval = 66+i*10;
		drawCirc( x+i/2, y-i/2, radius-i, redval, greenval, blueval, a, BumperState.ballContext );		
	}

}
//Draw the Ball
function drawCue(x, y, a, ballRadius){
	if( BumperState.ballCanvas == null ){
		setupBallCanvas();
	}
	BumperState.context.globalAlpha = a;
	var redval = 0;
	var greenval = 0;
	var blueval = 0;
	drawCirc( x+1, y+1, ballRadius+2, redval, greenval, blueval, 0.3, BumperState.context );	
	BumperState.context.drawImage( BumperState.ballCanvas, x-ballRadius, y-ballRadius, ballRadius*2, ballRadius*2);
	BumperState.context.globalAlpha = 1;
}
