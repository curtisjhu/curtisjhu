// References
// https://sbme-tutorials.github.io/2018/cv/notes/4_week4.html
// https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/image_effects


const gui = new dat.GUI({ name: "Convolutions" });

const node = document.createElement("div");
node.style = "background: rgb(0, 0, 0); padding: 6px;"
node.innerHTML = `
<h1>Convolutions in Image Processing</h1>
<p>
Under the umbrella of computer vision, feature extractions are helpful in extracting useful abstractions from images (commonly found in Convolutional Neural Networks).

They consist of these matrices (such as the one in the bottom left corner), that move across all the pixels in the image, acting as a "sifter" that alters the pixel in relation to its neighboring pixels.
</p>
<p>
In this demo, we are running well-known convolution kernels (filters) on all pixels through the GPU.
</p>

`;

gui.domElement.prepend(node);

gui.closed = false;

const kernels = [ 'identity', 'edge0', 'edge1', "edge2", "sharpen",  "box blur", "gaussian blur", "emboss", "sobel operator", "prewitt operator"];
var PARAMS = {
	"kernel": kernels[8],
}

gui.add(PARAMS, 'kernel', kernels);


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
	video.size(250, 250 *propRatio);
}

function draw() {
	if (!propRatio) return;

    shader(myShader);
	myShader.setUniform("tex0", video);
	myShader.setUniform('resolution', [width * displayDensity(), height * displayDensity()]);
	myShader.setUniform("filter", PARAMS.kernel);
	myShader.setUniform("propRatio", windowPropRatio);
	myShader.setUniform("scale", 2);
	myShader.setUniform("kernel", kernels.findIndex((e) => e == PARAMS.kernel));
	myShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
	rect(0,0,width,height);
}


function windowResized(){
	windowPropRatio = windowHeight / windowWidth;
	resizeCanvas(windowWidth, windowHeight);
}

