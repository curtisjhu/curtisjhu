// References
// https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/image_effects

 // P5 stuff
let myShader;
let video;
let propRatio;
let windowPropRatio;
function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  	createCanvas(windowWidth, windowHeight, WEBGL);
	let constraints = {
		video: {
			optional: [{ maxFrameRate: 10 }]
		},
		audio: false
  	};
	video = createCapture(constraints, { flipped: true }, onVideoCreated);
	video.position(0, 0);
	frameRate(10);
	windowPropRatio = windowHeight / windowWidth;
	noStroke();
}

function onVideoCreated() {
	// propRatio = height/ width;
	propRatio = video.height/video.width; // not efficient but will do
	video.size(250, 250*propRatio);
}

function draw() {
	if (!propRatio) return;

    shader(myShader);
	myShader.setUniform("tex0", video);
	myShader.setUniform('resolution', [width * displayDensity(), height * displayDensity()]);
	myShader.setUniform("propRatio", windowPropRatio);
	myShader.setUniform("scale", 1.4);
	rect(0,0,width,height);
}


function windowResized(){
	windowPropRatio = windowHeight / windowWidth;
	resizeCanvas(windowWidth, windowHeight);
}

