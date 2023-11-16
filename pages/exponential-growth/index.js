const regl = require("regl")();
const d3 = require("../d3.min.js");
const camera = require("regl-camera")(regl, {
    distance: 4,
    center: [0, 0, 0],
    theta: Math.PI * 0.5,
    phi: 0.0,
});

const { Pane } = require("tweakpane");
const TweakpaneLatexPlugin = require("tweakpane-latex")

const pane = new Pane({
    title: "Exponentially Growing Dots",
});
pane.registerPlugin(TweakpaneLatexPlugin)
pane.addBlade({
    view: "latex",
    content:
`
# Exponential Growth

Here we have some dots that will be growing exponentially according to the relationship:
$$ P = P_0 (1 + r)^t $$

where $t$ is the speed. $r$ is the rate. $P_0$ is the initial points. and we stop when we'e reached $P = $ maxPoints.
`,
markdown: true
})

const PARAMS = {
    distribution: "gaussian",
    maxPoints: 10000,
    rate: 0.08,
    initialPoints: 2,
    speed: 20
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

var rng = generators[PARAMS["distribution"]];

var points = [];
var t = 0;
var numPoints = 1;

function createPoints() {
    if (points.length > PARAMS["maxPoints"]){
        return;
    }

    numPoints = PARAMS["initialPoints"]*Math.pow(1 + PARAMS["rate"], t);

    for (var i = 0; i < numPoints.toFixed(0) - points.length; i++) {
        points.push({
            x: rng(),
            y: rng(),
            z: rng(),
            color: [0, 0, Math.random()]
        })
    }

    t++;
}

createPoints();

pane.addInput(PARAMS, "maxPoints", {
    max: 100000,
    min: 10
})
pane.addInput(PARAMS, "initialPoints", {
    max: 10,
    min: 1
})
pane.addInput(PARAMS, "rate", {
    max: 0.5,
    min: 0.01
})
pane.addInput(PARAMS, "speed", {
    max: 50,
    min: 1
})

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

    console.log(points.length)

    if (context.tick % PARAMS["speed"] == 0) {
        createPoints();
    }

    camera((state) => {
        drawPoints({
            positions: points.map(d => [d.x, d.y, d.z]),
            colors: points.map(d => d.color),
            numPoints: points.length
        })
    });
});
