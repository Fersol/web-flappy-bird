var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

var fly = new Audio();

bird.src = "img/hero.png"
bg.src = "img/back.png"
fg.src = "img/front.png"
pipeBottom.src = "img/pillow.png"
pipeUp.src = "img/pillow.png"

fly.src = "audio/fly.mp3"

var score = 0;
var gap = 120;

document.addEventListener('keydown', moveUp)

function moveUp() {
    yPos -= 20;
    fly.play()
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i< pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
        if (pipe[i].x == 80) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }



        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
                    location.reload();
                }

        if (pipe[i].x == 5) {
            score++;
        }
    }
    ctx.drawImage(fg, 0, 400);
    ctx.drawImage(bird, xPos, yPos);
    if (yPos < 400 - bird.height) yPos += grav;
    ctx.fillStype = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет:"+score, 50, cvs.height-30)
    requestAnimationFrame(draw);
}

pipeUp.onload = draw