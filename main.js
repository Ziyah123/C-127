song1= " ";
song2=" ";
leftWristX=0;
leftWristY=0; 
rightWristX=0;
rightWristY=0; 
score_rightWrist=0;
score_leftWrist=0; 
song1_status=" ";
song2_status="";



function setup() {
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
console.log("PoseNet is initialized");
}

function preload() {
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function play() {
song.play();
song.setVolume(1);
song.rate(1);

song2.play();
song2.setVolume(1);
song2.rate(1);
} 

function draw() {
image(VIDEO,0,0,600,500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

fill('#FF0000');
stroke('#FF0000');

if(score_rightWrist>0.2){
circle(rightWristX,rightWristY,20);
song2.stop();
if(song1_status==false){
song1.play();
document.getElementById("song").innerHTML="Playing-Harry Potter Theme Song";
}
}

if(score_leftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song2_status==false){
    song2.play();
    document.getElementById("song").innerHTML="Playing-Peter Pan Song";
    }
    }

}

function gotPoses(results) {

    if(results.length> 0 ) {
    console.log(results);
score_leftWrist=results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = "+score_leftWrist);
score_rightWrist=results[0].pose.keypoints[10].score;
console.log("scoreRightWrist = "+score_rightWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }

}