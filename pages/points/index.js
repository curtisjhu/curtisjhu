const regl = require("regl")();
const d3 = require("./d3.min.js");
const camera = require("regl-camera")(regl, {
    distance: 4,
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
    numPoints: 10000
};

const generators = {
    "gaussian": d3.randomNormal(0, 0.3),
    "uniform": d3.randomLcg(42),
    "exponential": d3.randomExponential(1 / 30),
    "bernoulli": d3.randomBernoulli(0.5),
    "geometric": d3.randomGeometric(0.1),
    "binomial": d3.randomBinomial(100, 0.3),
    "gamma": d3.randomGamma(2, 1),
    "beta": d3.randomBeta(3, 1.4),
    "weibull": d3.randomWeibull(10)
}

var rng;
function createPoints(gen=PARAMS["distribution"], numPoints=PARAMS["numPoints"]) {
    rng = generators[gen];
    console.log(rng)
    const points = d3.range(numPoints.toFixed(0)).map((i) => ({
        x: rng(),
        y: rng(),
        z: rng(),
        color: [0, Math.random(), 0],
    }));
    return points;
}

var points = createPoints();

pane.addInput(PARAMS, "numPoints").on("change", (ev) => {
    points = createPoints(PARAMS["distribution"], ev.value);
})
pane.addInput(PARAMS, "distribution", {
    options: {
        uniform: "uniform",
        gaussian: "gaussian",
        binomial: "binomial",
        geometric: "geometric",
        bernoulli: "bernoulli",
        exponential: "exponential",
        gamma: "gamma",
        beta: "beta",
    },
}).on("change", (ev) => {
    points = createPoints(ev.value)
});


const drawPoints = regl({
    uniforms: {
        pointWidth: 2,
    },
    attributes: {
        position: regl.prop("positions"),
        color: regl.prop("colors"),
    },
    count: regl.prop("numPoints"),
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

    camera((state) => {
        drawPoints({
            positions: points.map(d => [d.x, d.y, d.z]),
            colors: points.map(d => d.color),
            numPoints: points.length
        })
    });
});
