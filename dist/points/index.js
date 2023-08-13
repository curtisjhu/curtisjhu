// https://peterbeshai.com/blog/2017-05-26-beautifully-animate-points-with-webgl-and-regl/
const regl = require("regl")();
const d3 = require("./d3.min.js");

const numPoints = 10000;

const rng = d3.randomNormal(0, 0.13);
const points = d3.range(numPoints).map((i) => ({
	x: rng() * 2,
	y: rng() * 2,
	color: [0, Math.random(), 0],
}));


const drawPoints = regl({
    uniforms: {
        pointWidth: 2,
    },
    attributes: {
        position: points.map(d => [d.x, d.y]),
        color: points.map((d) => d.color),
    },
    count: numPoints,
    primitive: "points",
    vert: `
	precision mediump float;
	attribute vec2 position;
	attribute vec3 color;
	varying vec3 fragColor;
	uniform float pointWidth;

	void main() {
		fragColor = color;
		gl_PointSize = pointWidth;
		gl_Position = vec4(position, 0, 1);
	}
	`,
    frag: `
	precision mediump float;
	varying vec3 fragColor;
	uniform float pointWidth;

	void main() {
		gl_FragColor = vec4(fragColor, 1);
	}
	`,
});

regl.frame((context) => {
    drawPoints();
});
