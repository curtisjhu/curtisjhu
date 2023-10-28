// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");
const {funcs} = require("./functions");

const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const glsl = require("glslify");
const camera = require("regl-camera")(regl, {
	distance: 60,
	theta: Math.PI / 2,
	phi: -Math.PI /4,
	rotationSpeed: 0.7,
	zoomSpeed: 0.6
});


const { Pane } = require("tweakpane");
const TweakpaneLatexPlugin = require("tweakpane-latex");

var params  = new URLSearchParams(document.location.search);
var currentFunc = params.get("func") ? params.get("func") : funcs.ackley.name;
console.log(currentFunc)
const PARAMS = {
	"function": currentFunc,
	numPoints: 10000
}

console.log(funcs[currentFunc])
const mesh = require("glsl-solid-wireframe")(createMesh(funcs[currentFunc]));

const pane = new Pane({
	title: "Optimization Functions"
});


pane.registerPlugin(TweakpaneLatexPlugin);

pane.addBlade({
  view: "latex",
  content: `
Optimization functions are used to test optimization algorithms.
Here are some functions that have local minimas that try to test the performance of finding these local minimas.

<a href="https://www.sfu.ca/~ssurjano/optimization.html">More information</a>
`,
  markdown: true,
});

var listOfOptions = {};
for(let k in funcs) {
	listOfOptions[k] = k;
}
pane.addInput(PARAMS, 'function', {
	options: listOfOptions
}).on("change", function(ev) {
	document.location.search = "func="+ev.value;
});

const Functions = pane.addFolder({
	title: "Ackley"
})

Functions.addBlade({
	view: "latex",
	content: 
`
### Ackely Function
$$f(x,y) = -20 \\cdot \\exp \\left(- 0.2 \\sqrt{ \\frac{1}{2} \\cdot \\left( x^2 + y^2 \\right)} \\right) $$
$$ -\\exp \\left( \\frac{1}{2} \\cdot \\left[ \\cos(2 \\pi x) + \\cos(2 \\pi y) \\right] \\right) + 20 + e $$
The Ackley function is a performance benchmark for optimization algorithms.
More specifically, the global optimum point is at zero, but contains many local minimas.
It was discovered by David Ackley in a PhD dissertation.
`,
	markdown: true
})


const draw = regl({
	uniforms: {
		color: regl.prop("color")
	},
	attributes: {
		position: mesh.positions,
		barycentric: mesh.barycentric,
	},
	elements: mesh.cells,
	vert: `
	precision mediump float;
	attribute vec2 position, barycentric;
	uniform mat4 projection, view;
	#define PI 3.14159265
	#define E 2.7182818

	varying vec2 uv, b;
	varying vec4 finalPos;

	vec4 parametricFunc(vec2 uv) {

		float x = uv.x;
		float y = uv.y;
		float amplitude = 1.0;

		${funcs[PARAMS.function].function}

		return vec4(x, y, z, amplitude);
	}

	void main() {
		uv = position;
		b = barycentric;

		// map our vector on the uv plane into xyz vector
		finalPos = parametricFunc(uv);

		gl_Position = projection*view*vec4(finalPos.xyz, 1);
	}`,
	frag: glsl(`

	#extension GL_OES_standard_derivatives : enable
	precision mediump float;
	#pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)

	varying vec2 b;
	uniform vec3 color;
	varying vec2 uv;
	varying vec4 finalPos;

	void main() {
		float norm = finalPos.z / finalPos.w;
		vec3 col = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), norm);
		col = mix(vec3(0.2), col, vec3(grid(b, 0.2)));
		gl_FragColor = vec4(col, 1);

	}`)
});

regl.frame((c) => {
	regl.clear({
		color: [1, 1, 1, 1],
		depth: 1
	})

	camera((state) => {
		draw({
			uInt: funcs.eggwave.domain,
			vInt: funcs.eggwave.range,
			R: 0.2,
			P: 0.3,
			color: [0.4, 0.1, 0.6]
		});
	})
})