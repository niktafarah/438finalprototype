// import { Sprite } from "three";

// Declare some color constants
const colors = {
    red: "#BF616A",
    orange: "#D08770",
    yellow: "#EBCB8B",
    green: "#A3BE8C",
    blue: "#5E81AC",
    purple: "#B48EAD",
    grey: "#696969",
    darkgrey: "#5A5A5A",
    background: "#FFEDEC",
    foreground: "#ECEFF4",
    pink: "#ffb6c1",
  };
  

// Declare sprite variables
let walls;
let ball;
let net;
let netsign;
let netbound2;
let holder;
let netwall;
let randomnumX;
let randomnumY;
let img;
let chute;
let final;
let hiScores;
let mybutton;


// Initialize some params
let ballSize = 60;
let ballX = 300; 
let ballY = 500; 
let timeLimit = 10;
let finalScore = 0;
let scoreSize = 32;
let timer = 20;

var screen = 0;


function preload() {
    img = loadImage('mouse.png');
}

function setup() {
    new Canvas(windowWidth, windowHeight);
    world.gravity.y = 10;
    setupBounds();
    setupBall();
    setupFloor();
    setupNet();
    setupNetBounds();
    overlap();
    randomizeX();
    randomizeY();
    img.resize(50,50);
    restart();
}


function draw() {
    clear();
    if(screen == 0){
        startScreen();
        ball.visible = false;
        net.visible = false;
        floor.visible = false;
    } else if(screen == 1) {
        ball.visible = true;
        net.visible = true;
        floor.visible = true;
        mybutton.overlapping(ball);
        gameOn();
    } 
    else if(screen = 2) {
        ball.visible = false;
        net.visible = false;
        floor.visible = false;
        gameOver();
    } 
}

function startScreen(){
    mybutton.visible = false;
    background(colors.background);
    textAlign(CENTER);
    textSize(50);
    text('Mooshball', width/2, 0.5*height/3);
    textSize(30);
    text('Instructions:', width/2, height / 3);
    text('1. Try to get the moosh in the hoop.', width/2,1.25*height/3);
    text('2. Click your screen to direct the moosh to the hoop.', width/2,1.5*height/3);
    text('3. Good luck!', width/2,1.75*height/3);
    text('Click anywhere to begin', width/2,2.25*height/3);
    textFont('Georgia');
}

function gameOn() {
    mybutton.visible = false;
    background(colors.background);
    fill(0);
    net.overlapping(ball);
    netsign.overlapping(ball);
        if (mouse.presses()) {
            ball.direction = ball.angleTo(mouse);
            ball.speed = 10;
        }
    drawScore();
    drawTimer();
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(colors.grey);
    text(timer, width/2, height/2);
}

function mousePressed(){
	if(screen==0){
  	screen=1;
  } 
//   else if (mybutton) {
//     gameOn();
//   }
}


function gameOver() {
    // mybutton.visible = true;
    noLoop();
    background(colors.background);
    window.sendMessage(finalScore);
    // let scores = window.getAllMessages();
    // let hiScores = window.getAllMessages();
    // textAlign(CENTER);
        textSize(70);
        text('GAME OVER!', width / 2, 0.5*height/3);
        textSize(40);
        text('YOUR SCORE:' + finalScore, width / 2, height/4);
    var hiScores = [];
    window.getAllMessages().then((value) => {
        hiScores = value;
        textSize(30);
        // console.log("testing Value" + value);   
        text("Leadership Board", width / 2, height / 3+ 100);
        // textAlign(TOP);
        text(hiScores[0] + "\n" + hiScores[1] + "\n" + hiScores[2], width / 2, height / 3 + 200);
      });
  }

 
function restart() {
    mybutton = new Sprite();
    mybutton.color = colors.pink;
    mybutton.textSize = 30;
    mybutton.text = "Want to play again?";
    mybutton.w = 400;
    mybutton.h = 100;
    mybutton.collider = 'static';
    mybutton.pos = {x:windowWidth/2, y:windowHeight/2.5};
}
  
function drawTimer() {
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(colors.grey);
    text(timer, width/2, height/2);
    if (frameCount % 60 == 0 && timer > 0) { 
        timer --;
    }
    if (timer == 0) {
        screen = 2;
        let final = finalScore;
        console.log(final);
        return final;
    }    
  }

function drawScore() {
    textAlign(RIGHT, TOP);
    textSize(scoreSize);
    let wordWidth = textWidth(finalScore);
    fill(colors.grey);
    rectMode(CORNERS);
    rect(width, 0, width - wordWidth - 20, scoreSize + 20, 20);
    fill(colors.foreground);
    text(finalScore, width - 10, 10);
    if (ball.overlaps(netbound2)) {
        finalScore = finalScore + 10;
        return finalScore;
    }
}

function randomizeX() {
    randomnumX = int(random(20,400));
    return randomnumX;
}
function randomizeY() {
    randomnumY = int(random(300,600));
    return randomnumY;
}
function setupBall() {
    ball = new Sprite();
    ball.bounciness = 0.8;
    ball.draw = () => {
		fill(211, 211, 211);
		push();
		rotate(ball.direction);
		ellipse(0, 0, 70 + ball.speed, 70 - ball.speed);
		pop();
		image(img, ball.vel.x * 2, ball.vel.y * 2);
	};
}

function overlap() {
        net.overlapping(ball);
        netsign.overlapping(ball);
}

function setupBounds() {
    walls = new Sprite(
      [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
        [0, 1],
      ],
      "static"
    );
    walls.color = colors.background;
  }

function setupFloor() {
    floor = new Sprite ();
    floor.color = colors.pink;
    floor.y = windowHeight;
    floor.w = windowWidth;
    floor.h = windowHeight/3;
    floor.collider = 'static';
}

function setupNet() {
    net = new Sprite ();
    net.color = colors.pink;
    net.w = 200;
    net.h = 10;
    net.pos = {x:windowWidth, y:windowHeight/3};
    net.collider = 'static';

    netsign = new Sprite ();
    netsign.color = colors.yellow;
    netsign.w = 196;
    netsign.h = 1;
    netsign.pos = {x:windowWidth, y:windowHeight/3};
    netsign.collider = 'static';
    netsign.visible = false;
}

function setupNetBounds() {
    netbound = new Sprite ();
    netbound.pos = {x:windowWidth-100,y:windowHeight/3+110};
    netbound.h = windowHeight/4;
    netbound.w = 2;
    noStroke();
    netbound.visible = false;
    netbound.collider = 'static';

    chute = new Sprite (windowWidth, windowHeight/2+160, [windowHeight/3, -200]);
    noStroke();
    chute.visible = false;
    chute.collider = 'static';
    

    netbound2 = new Sprite ();
    netbound2.pos = {x:windowWidth,y:windowHeight/3+40};
    netbound2.h = 2;
    netbound2.w = 200;
    noStroke();
    ball.overlaps(netbound2);
    netbound2.visible = false;
    netbound2.collider = 'static';

}
