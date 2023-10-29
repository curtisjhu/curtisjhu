// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");

const regl = require("regl")({
	extensions: [
		"oes_standard_derivatives"
	]
});
const glsl = require("glslify");
const camera = require("regl-camera")(regl, {
	distance: 4,
	theta: Math.PI / 2,
	phi: 0,
	center: [0, 0, 0],
	zoomSpeed: 0.4,
	rotationSpeed: 0.5
});

const tweakpane = require("tweakpane")
const TweakpaneLatexPlugin = require("tweakpane-latex");

const PARAMS = {
	// interval
	u: { x: -1, y: 1 },
	v: { x: -2, y: 1 },
	mandelBrot: false
}

const pane = new tweakpane.Pane({
	title: "Mandelbrot Set / Bifurcation"
})

pane.registerPlugin(TweakpaneLatexPlugin);
pane.addBlade({
	view: "latex",
	content: `
# Mandel Brot Set and the Bifurcation Diagram
The Mandelbrot set is perhaps the most iconic picture in mathematics.
This animation shows the relationship between the two.
<a href="https://en.wikipedia.org/wiki/Mandelbrot_set#Basic_properties">Look more here.</a>
I haven't seen anyone do the mandelbrot set in this particular interactive way. I hope it gives you some insight.
`,
	markdown: true
})

var bufferpositions = []

var count = 0;
function addPoints(num=500) {
	for (var i =0; i < num; i++) {

		var convergeXWin = 2;
		var decayRate = 0.000001;
		var x = Math.random()*(PARAMS.v.y - PARAMS.v.x) + PARAMS.v.x;
		
		var dir = Math.random() > 0.5 ? 1 : -1;
		// y axis must then be symmetrical
		var y = dir * Math.random()*(PARAMS.u.y - PARAMS.u.x)*(Math.exp(-decayRate*count))/2.0;
		count+=0.1;

		var B = 256;
		var l = 0;
		var zx = 0;
		var zy = 0;

		var tmp = [0, 0, 0, 0];
		for (var j =0, txp; j < 512; j++ ) {
			txp = zx;
			zx = zx*zx - zy*zy + x;
			zy = 2*txp*zy + y;

			tmp[j % 4] = zx;

			if (zx*zx + zy*zy > B*B) break;
			l += 1;
		}

		var alpha = 0.0;
		if (l > 511) {
			// actually oscillates
			alpha = 1.0;
		}

		var desired = tmp[Math.floor(Math.random() * 4)];

		bufferpositions.push([x,y,desired,alpha]);
	}
	return bufferpositions;
}

const draw = regl({
	uniforms: {
		color: regl.prop("color")
	},
	attributes: {
		position: regl.prop("positions")
	},
	count: regl.prop("count"),
	primitive: "points",
	vert: `
	precision mediump float;
	attribute vec4 position;
	uniform mat4 projection, view;

	varying vec4 uv;

	void main() {
		uv = position;

		// map our vector on the uv plane into xyz vector
        gl_PointSize = 3.0;
		gl_Position = projection*view*uv;
	}`,
	frag: glsl(`
	#extension GL_OES_standard_derivatives : enable
	precision mediump float;

	uniform vec3 color;
	varying vec4 uv;

	void main() {
		vec3 col = 0.5 + 0.5*cos(uv.xyx+vec3(0,2,4));
		gl_FragColor = vec4(col, uv.w);

	}`)
});

addPoints();

regl.frame((c) => {
	regl.clear({
		color: [1, 1, 1, 1],
		depth: 1
	})

	camera((state) => {
		draw({
			positions: bufferpositions,
			count: bufferpositions.length
		});
		state.phi = c.time;
	})

	if (count < 1e5)
		addPoints();
})