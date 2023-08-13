// https://peterbeshai.com/blog/2017-05-26-beautifully-animate-points-with-webgl-and-regl/
const regl = require("regl")();
const d3 = require("d3");


const numPoints = 100000;

const width = window.innerWidth;
const height = window.innerHeight;

const rng = d3.randomNormal(0, 0.15);

const points = d3.range(numPoints).map(i => ({
  x: (rng() * width) + (width / 2),
  y: (rng() * height) + (height / 2),
  color: [0, Math.random(), 0],
}));


const drawPoints = regl({
	uniforms: {
		pointWidth: 0.01 
	},
	attributes: {
		position: points.map(d => [d.x, d.y]),
		color: points.map(d => d.color)

	},
	count: points.length,
	primitive: "points",
	vert: `
	precision mediump float;
	uniform vec2 position;
	uniform vec3 color;
	varying vec3 fragColor;

	void main() {
		fragColor = color;
		gl_PointSize = pointWidth;
		gl_FragCoord = vec4(position, 0, 1);
	}
	`,
	frag: `
	precision mediump float;
	varying vec3 fragColor;
	uniform float pointWidth;

	void main() {
		gl_FragColor = vec4(fragColor, 0, 1);
	}
	`

})