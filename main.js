song="";
song1="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist=0;
scorerightWrist=0;
song_status = "";
song1_status = "";

function preload(){
    song = loadSound("one.mp3");
    song1 = loadSound("two.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,600);
    fill("FF0000");
    stroke("#000000");
    song_status = song.isPlaying();
    song1_status = song1.isPlaying();
    
    if(scoreleftWrist >0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(song_status==false){
        song.play();
        document.getElementById("code").innerHTML = "Playing Roar Song";
    }
    }
    if(scorerightWrist >0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("code").innerHTML = "Playing Eye Of the Tiger Song";
        }
        }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}

function modelLoaded(){
    console.log('PoseNet is Intialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = "+ scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist = "+ scorerightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY);
    }
}
