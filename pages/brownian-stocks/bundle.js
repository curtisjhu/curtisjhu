const gui = new dat.GUI({ name: "Stickman" });

const node = document.createElement("div");
node.style = "background: rgb(0, 0, 0); padding: 6px;"
node.innerHTML = `
<h1>Geometric Brownian Motion</h1>
<p>
Statistical physics have long inspired the basis of our economic models.
In fact the Nobel Prize winning Black-Scholes equation is a page taken straight from thermal physics.
Here's a little simulation of geometric brownian motion used in the Stochastic Differential Equation in Black-Scholes.
</p>
<button onclick="window.location.reload()">refresh</button>
`;
gui.domElement.prepend(node);
gui.closed = false;

var PARAMS = {
	framerate: 10,
	N: 60,
	sigma: 5,
	mu: 0.2
}

gui.add(PARAMS, "sigma", 0.001, 20)
   .onFinishChange(v => {
		norm = d3.randomNormal(-PARAMS.mu, PARAMS.sigma);
   });
gui.add(PARAMS, "mu", -10, 10)
   .onFinishChange(v => {
		norm = d3.randomNormal(-PARAMS.mu, PARAMS.sigma);
   });
gui.add(PARAMS, "N", 1, 200)
   .onFinishChange((v) => {
		setup();
   });
gui.add(PARAMS, "framerate", 1, 45)
   .onFinishChange((v) => {
		frameRate(PARAMS.framerate);
   });

let hist;
const N = 60;
let SCREEN_HALF;
let dx;
let c;

let REDRAW;
let RESIZED;
let FRAMERATE;

let norm;


function setup() {
	c = createCanvas(windowWidth, windowHeight);

	SCREEN_HALF = height / 2;
	dx = 2;
	REDRAW = false;
	RESIZED = false;
	FRAMERATE=10;

	// negative because the canvas axis is reversed
	norm = d3.randomNormal(-PARAMS.mu, PARAMS.sigma);

	hist = []
	for (let i = 0; i < PARAMS.N; i++) {
		hist.push([0, 0])
	}
	
	frameRate(PARAMS.framerate);
	background(0);
}
  
function draw() {
	stroke(0, 255, 0, 80)

	// if goes beyond screen, redraw everything
	if ((hist[0].length-1) * dx > width || RESIZED) {
		background(0);
		REDRAW = true;
		RESIZED = false;
		PARAMS.framerate += 4;
		frameRate(PARAMS.framerate);
	} else {
		REDRAW = false;
	}

	for (let i = 0; i < PARAMS.N; i++) {
		let x1, x0, h1, h0;

		let x;
		if (REDRAW)
			x = 1;
		else
			x = hist[i].length - 1;

		// draw lines
		for (; x < hist[i].length; x++) {
			h1 = hist[i][x];
			x1 = x * dx;

			h0 = hist[i][x-1];
			x0 = (x-1) * dx;
		
			line(x0, SCREEN_HALF + h0, x1, SCREEN_HALF + h1);
		}

		// dB is a small coin flip
		// Doing arithmetic BM
		// dX_t = \mu dt + \sigma dW_t
		// X_t = x_0 + \mu t + \sigma W_t
		var S_t = hist[i][x-1]
		var dS = norm();
		hist[i].push(S_t + dS);

		if (REDRAW) {
			hist[i].shift();
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	RESIZED = true;
}

	  