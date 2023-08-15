const regl = require("regl")();
const { Pane } = require("tweakpane");
const { create, all } = require("mathjs");
const camera = require("regl-camera")(regl, {
    zoomSpeed: 0.6,
    rotationSpeed: 0.6,
    theta: Math.PI / 2,
    distance: 3,
});
const d3 = require("../d3.min.js");

const PARAMS = {
    u: {
        domain: { x: -1, y: 1 },
        range: { x: -1, y: 1 },
    },
    v: {
        domain: { x: -1, y: 1 },
        range: { x: -1, y: 1 },
    },
    t: {
        domain: { x: -1, y: 1 },
        range: { x: -1, y: 1 },
    },
    x: "",
    y: "",
    z: "",
	axis: {
		xAxis: { x: -1, y: 1 },
		yAxis: { x: -1, y: 1 },
		zAxis: { x: -1, y: 1 },
	},

    numPoints: 1000,
};

const pane = new Pane({
    title: "Parametric Graphing",
    expanded: true,
});
pane.addInput(PARAMS, "numPoints", { format: (e) => e.toFixed(0) });

const func = pane.addFolder({
    title: "Functions",
    expanded: true,
});
func.addInput(PARAMS, "x");
func.addInput(PARAMS, "y");
func.addInput(PARAMS, "z");

const sub = pane.addFolder({
    title: "Domain/Range",
    expanded: false,
});

const x = sub.addFolder({
    title: "axis",
    expanded: true,
});
x.addInput(PARAMS["axis"], "xAxis");
x.addInput(PARAMS["axis"], "yAxis");
x.addInput(PARAMS["axis"], "zAxis");

const t = sub.addFolder({
    title: "t",
    expanded: false,
});
t.addInput(PARAMS["t"], "domain");
t.addInput(PARAMS["t"], "range");

const u = sub.addFolder({
    title: "u",
    expanded: false,
});
u.addInput(PARAMS["u"], "domain");
u.addInput(PARAMS["u"], "range");

const v = sub.addFolder({
    title: "v",
    expanded: false,
});
v.addInput(PARAMS["v"], "domain");
v.addInput(PARAMS["v"], "range");

const examples = pane.addFolder({
    title: "Examples",
    expanded: false,
});

// Creating points

function getPointsSingleParametric() {
    var tDom = PARAMS.t.domain;
    var t = tDom.x,
        dt = (tDom.y - tDom.x) / PARAMS["numPoints"];
    const coords = d3.range(PARAMS["numPoints"]).map((el, ind) => {
        t += dt;
        return {
            x: Math.pow(Math.cos(t), 3),
            y: Math.pow(Math.sin(t), 3),
            z: 0,
            color: [0, 0.7, 0],
        };
    });

    return coords;
}

var coords = getPointsSingleParametric();

const draw = regl({
    uniforms: {
        background: [1, 1, 1],
        pointWidth: 3,
        func: regl.prop("func"),
    },
    attributes: {
        position: regl.prop("coords"),
        colors: regl.prop("colors"),
    },
    count: regl.prop("numPoints"),
    primitive: "line strip",
    lineWidth: 1,
    vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec3 colors;
	uniform float pointWidth;
	varying vec3 fragColor;
	uniform mat4 projection, view;

    void main() {
		gl_PointSize = pointWidth;
		fragColor = colors;
    	gl_Position = projection*view*vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec3 fragColor;

    void main() {
      	gl_FragColor = vec4(fragColor, 1);
    }`,
});

const drawPlane = regl({
    uniforms: {
        color: [0.3, 0.3, 0.3, 0.4],
    },
    attributes: {
        position: regl.prop("domain"),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec3 position;
	uniform mat4 projection, view;

    void main() {
    	gl_Position = projection*view*vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	uniform vec4 color;

    void main() {
      	gl_FragColor = color;
    }`,
});

const drawAxis = regl({
    uniforms: {
        color: [0.2, 0.2, 0.2, 0.4],
    },
    attributes: {
        position: regl.prop("domain"),
    },
    count: 2,
    primitive: "line strip",
    vert: `
    precision mediump float;
    attribute vec3 position;
	uniform mat4 projection, view;

    void main() {
    	gl_Position = projection*view*vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	uniform vec4 color;

    void main() {
      	gl_FragColor = color;
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
    });

    camera((state) => {
        draw({
            coords: coords.map((e) => [e.x, e.y, e.z]),
            colors: coords.map((e) => e.color),
            numPoints: coords.length,
        });
        drawPlane({
            domain: [
                [-1, 0, -1],
                [-1, 0, 1],
                [1, 0, -1],
                [-1, 0, 1],
                [1, 0, -1],
                [1, 0, 1],
            ],
        });

        // Draw the Axis

        // x
        drawAxis({
            domain: [
                [-1, 0, 0],
                [1, 0, 0],
            ],
        });

        // y
        drawAxis({
            domain: [
                [0, -1, 0],
                [0, 1, 0],
            ],
        });

        // z
        drawAxis({
            domain: [
                [0, 0, -1],
                [0, 0, 1],
            ],
        });
    });
});
