var BumperState ={};
BumperState.context=null;
BumperState.canvas=null;
BumperState.background =null;
BumperState.currX;
BumperState.currY;
BumperState.xv=0;
BumperState.yv=0;
BumperState.slideX;
BumperState.slideY;
BumperState.Touch = false;

BumperState.TIMEINT=20;
BumperState.ballRadius=12;
BumperState.holeRadius=20
BumperState.bumperRadius=10;
//use one timer
BumperState.intervalVar=null;
BumperState.anim=null;

BumperState.ballSelected=false;
BumperState.SCORE =0;
BumperState.LIVES = 10;
BumperState.LEVEL=1;
BumperState.ballMoving = false;
BumperState.BALLSTARTX;
BumperState.BALLSTARTY;

//Sounds
BumperState.sunkSound =null;
BumperState.wallSound = null;
BumperState.bumperSound = null;

BumperState.bumperArray =[];

BumperState.levelCoordsX= [0,-BumperState.holeRadius*2,0,BumperState.holeRadius*2,0,-BumperState.holeRadius*3,BumperState.holeRadius*3,-BumperState.holeRadius*6,BumperState.holeRadius*6 ];
BumperState.levelCoordsY= [BumperState.holeRadius*2,0,-BumperState.holeRadius*2,0,BumperState.holeRadius*5,BumperState.holeRadius*4,BumperState.holeRadius*4,BumperState.holeRadius*4,BumperState.holeRadius*4];
BumperState.bumperContext=null;
BumperState.bumperCanvas=null;
BumperState.ballContext = null;
BumperState.ballCanvas = null;
BumperState.holeContext = null;
BumperState.holeCanvas = null;
BumperState.bumperMessageCheck = true;
BumperState.message = "Start - \nHold and Drag Ball";

