// Reference
// Based heavily on the work of smarter people:
// https://blog.tensorflow.org/2018/05/real-time-human-pose-estimation-in.html

const gui = new dat.GUI({ name: "Stickman" });

const node = document.createElement("div");
node.style = "background: rgb(0, 0, 0); padding: 6px;"
node.innerHTML = `
<h1>Adventures of Stickman</h1>
<p>
In a galaxy far far away, lived a stickman who is your doppelganger.
</p>
`;
gui.domElement.prepend(node);
gui.closed = false;

const imageScaleFactor = 1;
const flipHorizontal = false;
const outputStride = 1;

// get up to 5 poses
const maxPoseDetections = 3;
// minimum confidence of the root part of a pose
const scoreThreshold = 0.7;
// minimum distance in pixels between the root parts of poses
const nmsRadius = 20;

const BODY = {
  nose: 0,
  leftEye: 1,
  rightEye: 2,
  leftEar: 3,
  rightEar: 4,
  leftShoulder: 5,
  rightShoulder: 6,
  leftElbow: 7,
  rightElbow: 8,
  leftWrist: 9,
  rightWrist: 10,
  leftHip: 11,
  rightHip: 12,
  leftKnee: 13,
  rightKnee: 14,
  leftAnkle: 15,
  rightAnkle: 16
}
  

 // P5 stuff
let video;
let windowPropRatio;
let net;
let propRatio = 1;


let keypoints = {};
const keys = Object.keys(BODY);
keys.forEach(key => {
  keypoints[key] = false;
})

function setup() {
  createCanvas(windowWidth, windowHeight);
	let constraints = {
		video: {
			optional: [{ maxFrameRate: 10 }]
		},
		audio: false
  };
  posenet.load().then(e => net = e).then(() => {
    video = createCapture(constraints, { flipped: true }, onVideoCreated);
    video.position(0, 0);

    frameRate(10);
    fill(255);
    windowPropRatio = windowHeight / windowWidth;
  })

}


function onVideoCreated() {
  video.elt.addEventListener("play", play);
}

function play() {
  propRatio = video.height / video.width;
  video.size(250, 250*propRatio);

  window.draw =  function() {
    background(255);

    video.elt.width = video.width;
    video.elt.height = video.height;
    net.estimateSinglePose(video.elt, imageScaleFactor, flipHorizontal, outputStride)
      .then((vals) => {
        updateKeypoints(vals.keypoints);
      })
      .catch(err => console.error(err));
    drawStickman(keypoints);
  }

}

function updateKeypoints(newKeypoints) {
  const THRESHOLD = 0.8;
  const LOWER_THRESHOLD = 0.2;
  for (let i = 0; i < newKeypoints.length; i++) {
    let node = newKeypoints[i];
    if (node.score > THRESHOLD) {
      keypoints[i] = node;
    } else if (node.score > LOWER_THRESHOLD) {
      let p1 = keypoints[BODY.leftWrist];
      let p2 = keypoints[BODY.rightWrist];
      if ( p1 && p2 && dist(p1.x, p1.y, p2.x, p2.y) < 10 ) {
        keypoints[BODY.leftWrist] = false;
        keypoints[BODY.rightWrist] = false;
      }

      p1 = keypoints[BODY.leftAnkle];
      p2 = keypoints[BODY.rightAnkle];
      if ( p1 && p2 && dist(p1.x, p1.y, p2.x, p2.y) < 10 ) {
        keypoints[BODY.leftAnkle] = false;
        keypoints[BODY.rightAnkle] = false;
      }
    } else {
      keypoints[i] = false;
    }
  }
}


function drawStickman(keypoints) {
  // don't display if probability is low.
  // or just don't update

    var leftShoulder = getPos(BODY.leftShoulder, keypoints);
    var rightShoulder = getPos(BODY.rightShoulder, keypoints);


    var leftElbow = getPos(BODY.leftElbow, keypoints);
    var rightElbow = getPos(BODY.rightElbow, keypoints);

    var leftWrist = getPos(BODY.leftWrist, keypoints);
    var rightWrist = getPos(BODY.rightWrist, keypoints);
    
    // Draw Arms
    if (leftShoulder && leftElbow) {
      line(leftShoulder.x, leftShoulder.y, leftElbow.x, leftElbow.y);
    }
    if (leftElbow && leftWrist) {
      line(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y);
    }
    if (rightShoulder && rightElbow) {
      line(rightShoulder.x, rightShoulder.y, rightElbow.x, rightElbow.y);
    }
    if (rightElbow && rightWrist) {
      line(rightElbow.x, rightElbow.y, rightWrist.x, rightWrist.y);
    }

    var nose = getPos(BODY.nose, keypoints);

    // Draw collarbone
    if (leftShoulder && rightShoulder) {
      line(leftShoulder.x, leftShoulder.y, rightShoulder.x, rightShoulder.y);

      var center = {x: (leftShoulder.x + rightShoulder.x) / 2, y: (leftShoulder.y + rightShoulder.y) / 2};
      if (nose) {
        line(nose.x, nose.y, center.x, center.y);
      }
    }


    // draw body
    var leftHip = getPos(BODY.leftHip, keypoints);
    var rightHip = getPos(BODY.rightHip, keypoints);
    if (leftHip && rightHip && leftShoulder && rightShoulder) {
      var hip = {x: (leftHip.x + rightHip.x) / 2, y: (leftHip.y + rightHip.y) / 2};
      var center = {x: (leftShoulder.x + rightShoulder.x) / 2, y: (leftShoulder.y + rightShoulder.y) / 2};
      line(center.x, center.y, hip.x, hip.y);
    }

    // draw head
    var leftEye = getPos(BODY.leftEye, keypoints);
    var rightEye = getPos(BODY.rightEye, keypoints);
    if (leftEye && rightEye) {
      var leftEar = getPos(BODY.leftEar, keypoints);
      var rightEar = getPos(BODY.rightEar, keypoints);

      let w = 100;
      let ang = 0;
      let h = 150;
      let x = (rightEye.x + leftEye.x)/2;
      let y = (rightEye.y + leftEye.y)/2;

      if (leftEar && rightEar) {
        w = dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y);
        let v = createVector(rightEar.x - leftEar.x, rightEar.y - leftEar.y);
        ang = p5.Vector.angleBetween(v, createVector(1, 0));
      } else {
        w = 1.5 * dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
      }

      if (nose) {
        h = 5*dist(x, y, nose.x, nose.y);
      } else {
        h = 1.5 * w;
      }
      
      translate(x, y);
      rotate(-ang);
      ellipse(0, 0, w, h);
      rotate(ang);
      translate(-x, -y);


      if (rightEye && leftEye) {
        line(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
      }

    }

    var leftKnee = getPos(BODY.leftKnee, keypoints);
    var rightKnee = getPos(BODY.rightKnee, keypoints);
    var leftAnkle = getPos(BODY.leftAnkle, keypoints);
    var rightAnkle = getPos(BODY.rightAnkle, keypoints);

    // draw legs
    if (hip && leftKnee) {
      line(hip.x, hip.y, leftKnee.x, leftKnee.y);
    }
    if (hip && rightKnee) {
      line(hip.x, hip.y, rightKnee.x, rightKnee.y);
    }
    if (leftKnee && leftAnkle) {
      line(leftKnee.x, leftKnee.y, leftAnkle.x, leftAnkle.y);
    }
    if (rightKnee && rightAnkle) {
      line(rightKnee.x, rightKnee.y, rightAnkle.x, rightAnkle.y);
    }

}

function predictPoses() {
    net.estimateSinglePose(video.elt, imageScaleFactor, flipHorizontal, outputStride)
      .then((vals) => {
        var keypoints = vals.keypoints;
        var n = getPos(BODY.nose, keypoints);
        ellipse(n.x, n.y, 50, 50);

        var leftShoulder = getPos(BODY.leftShoulder, keypoints);
        var rightShoulder = getPos(BODY.rightShoulder, keypoints);
        line(leftShoulder.x, leftShoulder.y, rightShoulder.x, rightShoulder.y);

        var leftElbow = getPos(BODY.leftElbow, keypoints);
        var rightElbow = getPos(BODY.rightElbow, keypoints);
        line(leftElbow.x, leftElbow.y, leftShoulder.x, leftShoulder.y);
        line(rightElbow.x, rightElbow.y, rightShoulder.x, rightShoulder.y);



      })
      .then(predictPoses)
      .catch(err => console.error(err));
}

function getPos(index, keypoints) {
  if (keypoints[index]) {
    var position = keypoints[index].position;
    // TODO: fix this
    return {
      x: position.x * windowWidth / video.width,
      y: position.y * windowHeight / video.height
    }
  }
}


function windowResized() {
	windowPropRatio = windowHeight / windowWidth;
	resizeCanvas(windowWidth, windowHeight);
}
