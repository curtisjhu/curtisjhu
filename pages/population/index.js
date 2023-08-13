// https://peterbeshai.com/blog/2017-05-26-beautifully-animate-points-with-webgl-and-regl/
const regl = require("regl")();
const d3 = require("./d3.min.js");
const camera = require("regl-camera")(regl, {
    distance: 2,
    center: [0, 0, 0],
    theta: Math.PI * 0.5,
    phi: 0.0,
});

const { Pane } = require("tweakpane");

const pane = new Pane({
    title: "3d Points Distributed",
});

const PARAMS = {
    distribution: "gaussian",
};

pane.addInput(PARAMS, "distribution", {
    options: {
        uniform: "uniform",
        gaussian: "gaussian",
        poisson: "poisson",
        binomial: "binomial",
        geometric: "geometric",
        bernoulli: "bernoulli",
        exponential: "exponential",
        pareto: "pareto",
        logistic: "logistic",
        cauchy: "cauchy",
        gamma: "gamma",
        beta: "beta",
    },
});

const numPoints = 10000;

const rng = d3.randomNormal(0, 0.13);
const points = d3.range(numPoints).map((i) => ({
    x: rng() * 2,
    y: rng() * 2,
    z: rng() * 2,
    color: [0, Math.random(), 0],
}));

const drawPoints = regl({
    uniforms: {
        pointWidth: 2,
    },
    attributes: {
        position: points.map((d) => [d.x, d.y, d.z]),
        color: points.map((d) => d.color),
    },
    count: numPoints,
    primitive: "points",
    vert: `
	precision mediump float;
	attribute vec3 position;
	attribute vec3 color;
	varying vec3 fragColor;
	uniform float pointWidth;
	uniform mat4 projection, view;

	void main() {
		fragColor = color;
		gl_PointSize = pointWidth;
		gl_Position = projection * view * vec4(position, 1);
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
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });
    camera(drawPoints);
});
