import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
  } from "firebase/firestore";
//   import { html, render } from "lit-html";

const firebaseConfig = {
    apiKey: "AIzaSyBg1oSkWWo2JFvS3rnRhCKiinhsI8JOst8",
    authDomain: "final-prototype-682b9.firebaseapp.com",
    projectId: "final-prototype-682b9",
    storageBucket: "final-prototype-682b9.appspot.com",
    messagingSenderId: "378274101314",
    appId: "1:378274101314:web:586fba5e0fc27e842dd5db"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messages = [];
const messagesRef = collection(db, "scores");


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
let netbound;
let netbound2;
let holder;
let netwall;
let randomnumX;
let randomnumY;
let img;
let chute;
let final;




// Initialize some params
let ballSize = 60;
let ballX = 300; 
let ballY = 500; 
let timeLimit = 10;
let finalScore = 0;
let scoreSize = 32;
let timer = 10;

var screen = 0;



window.preload = () => {
    img = loadImage('mouse.png');
}
window.setup = () =>  {
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
}

window.mousePressed = () => {
	if(screen==0){
  	screen=1;
  } else if (screen==2) {
    screen=0;
  }
}

window.draw = () => {
    clear();
    if(screen == 0){
        startScreen()
        ball.visible = false;
        net.visible = false;
        floor.visible = false;
    } else if(screen == 1) {
        ball.visible = true;
        net.visible = true;
        floor.visible = true;
        gameOn();
    } else if(screen == 2) {
        ball.visible = false;
        net.visible = false;
        floor.visible = false;
        gameOver();
        return screen;
    }
}

window.startScreen = () =>{
    background(150);
    // fill(255)
    textAlign(CENTER);
    text('Mooshball', width/2, 0.5*height/3)
    text('Instructions', width/2, height / 3)
    text('1. Try to get the moosh in the hoop.', width/2,1.25*height/3)
    text('2. Click your screen to direct the moosh to the hoop.', width/2,1.5*height/3)
    text('3. Good luck', width/2,1.75*height/3)
    text('Click anywhere to begin', width/2,2.25*height/3)
    textFont('Georgia')
    textSize(20)
}

window.gameOn = () => {
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


window.gameOver = () => {
    noLoop();
    background(150)
    textAlign(CENTER);
        text('GAME OVER!', width / 2, height / 2)
        text('YOUR SCORE:' + finalScore, width / 2, height / 2 + 100)
    fill(255)
    screen = 2;
    // window.sendMessage(finalScore);
    sendMessage(finalScore);
    let scores = getAllMessages();
    console.log(scores);
  }

window.drawTimer = () =>{
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

window.drawScore = () => {
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

window.randomizeX = () => {
    randomnumX = int(random(20,400));
    return randomnumX;
}
window.randomizeY = () => {
    randomnumY = int(random(300,600));
    return randomnumY;
}
window.setupBall = () => {
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

window.overlap = () => {
        net.overlapping(ball);
        netsign.overlapping(ball);
}

window.setupBounds = () => {
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

window.setupFloor = () => {
    floor = new Sprite ();
    floor.color = colors.pink;
    floor.y = windowHeight;
    floor.w = windowWidth;
    floor.h = windowHeight/3;
    floor.collider = 'static';
}

window.setupNet = () => {
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

window.setupNetBounds = () => {
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

async function sendMessage(final) {
    console.log("Sending a message!");
    // Add some data to the messages collection
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        time: Date.now(),
        scores: final,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // window.sendMessage=sendMessage
  }
  sendMessage();


 async function getAllMessages() {
  messages = [];

  const querySnapshot = await getDocs(
    query(messagesRef, orderBy("time", "desc")));
  querySnapshot.forEach((doc) => {
    let msgData = doc.data();
    messages.push(msgData);
  });

  console.log(messages);
}
getAllMessages();


onSnapshot(
  collection(db, "messages"),
  (snapshot) => {
    console.log("snap", snapshot);
    getAllMessages();
  },
  (error) => {
    console.error(error);
  }
);