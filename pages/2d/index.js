const regl = require("regl")({
    extensions: ["ANGLE_instanced_arrays"],
});
const { Pane } = require("tweakpane");
const { create, all } = require("mathjs");
const camera = require("regl-camera")(regl, {
    zoomSpeed: 0.6,
    rotationSpeed: 0.6,
    theta: Math.PI / 2,
    distance: 8,
});
const InfoDump = require("tweakpane-plugin-infodump");
const d3 = require("../d3.min.js");
const reglLines = require("regl-gpu-lines");

const functionList = require("./examples.js");

const url = new URLSearchParams(window.location.search);
var query = url.get("example") || "butterfly";
console.log(query);
const PARAMS = {
    t: { x: 0, y: 12 * Math.PI },
    example: query,
    numPoints: 1000,
    axis: {
        xAxis: {x:-1, y:1},
        yAxis: {x:-1, y:1},
        zAxis: {x:-1, y:1}
    }
};

// TWEAKPANE
const pane = new Pane({
    title: "Parametric Curves",
    expanded: true,
});
pane.registerPlugin(InfoDump);
pane.addInput(PARAMS, "numPoints", { format: (e) => e.toFixed(0) });

const optionList = {};
for (let x in functionList) {
    optionList[x] = x;
}
pane.addInput(PARAMS, "example", {
    options: optionList,
}).on("change", (ev) => {
    console.log(ev.value);
    PARAMS.t.x = functionList[ev.value].interval.x;
    PARAMS.t.y = functionList[ev.value].interval.y;

    PARAMS.axis.xAxis.x = -1, 
    PARAMS.axis.yAxis.x = -1, 
    PARAMS.axis.zAxis.x = -1;
    
    PARAMS.axis.xAxis.y = 1,
    PARAMS.axis.yAxis.y = 1,
    PARAMS.axis.zAxis.y = 1;

    coords = getParametric();
});
pane.addBlade({
    view: "infodump",
    content:
        "Unfortunately, javascript will yell at me if I directly accept input to create functions. A workaround would be to use a math AST. For now we can just use some of the provided examples.",
});


// Creating points
function getParametric() {
    var { interval } = functionList[PARAMS.example];
    var tDom = interval || PARAMS.t;
    var t = tDom.x,
        dt = (tDom.y - tDom.x) / PARAMS.numPoints;
    const coords = d3.range(PARAMS.numPoints).map((el, ind) => {
        t += dt;

        var { f } = functionList[PARAMS.example];
        var { x, y, z } = f(t);

        PARAMS.axis.xAxis.x = Math.min( x, PARAMS.axis.xAxis.x);
        PARAMS.axis.xAxis.y = Math.max( x, PARAMS.axis.xAxis.y);
        PARAMS.axis.yAxis.x = Math.min( y, PARAMS.axis.yAxis.x);
        PARAMS.axis.yAxis.y = Math.max( y, PARAMS.axis.yAxis.y);
        PARAMS.axis.zAxis.x = Math.min( z, PARAMS.axis.zAxis.x);
        PARAMS.axis.zAxis.y = Math.max( z, PARAMS.axis.zAxis.y);

        return {
            x: x,
            y: y,
            z: z,
            color: [0, 0.7, 0],
        };
    });
    return coords;
}

var coords = getParametric();

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

const drawLines = reglLines(regl, {
    vert: `
    precision highp float;
    uniform mat4 projection, view;

    // Use a vec2 attribute to construt the vec4 vertex position
    #pragma lines: attribute vec3 pos;
    #pragma lines: position = getPosition(pos);
    vec4 getPosition(vec3 pos) {
      return projection*view*vec4(pos, 1);
    }

    // Return the line width from a uniorm
    #pragma lines: width = getWidth();
    uniform float width;
    float getWidth() {
      return width;
    }`,
    frag: `
    precision lowp float;
    uniform vec4 color;
    void main () {
      gl_FragColor = color;
    }`,

    // Multiply the width by the pixel ratio for consistent width
    uniforms: {
        width: (ctx, props) => ctx.pixelRatio * 3,
        color: [0.4, 0.4, 0.4, 1],
    },
});

regl.frame(({ time }) => {
    regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
    });

    camera((state) => {
        drawLines({
            cap: "round",
            vertexCount: 2,
            vertexAttributes: {
                pos: regl.buffer([
                    [PARAMS.axis.xAxis.x, 0, 0],
                    [PARAMS.axis.xAxis.y, 0, 0],
                ]),
            },
            endpointCount: 2,
            endpointAttributes: {
                pos: regl.buffer([
                    [PARAMS.axis.xAxis.x, 0, 0],
                    [PARAMS.axis.xAxis.y, 0, 0],
                ]),
            },
        });
        drawLines({
            cap: "round",
            vertexCount: 2,
            vertexAttributes: {
                pos: regl.buffer([
                    [0, PARAMS.axis.yAxis.x, 0],
                    [0, PARAMS.axis.yAxis.y, 0],
                ]),
            },
            endpointCount: 2,
            endpointAttributes: {
                pos: regl.buffer([
                    [0, PARAMS.axis.yAxis.x, 0],
                    [0, PARAMS.axis.yAxis.y, 0],
                ]),
            },
        });
        drawLines({
            cap: "round",
            vertexCount: 2,
            vertexAttributes: {
                pos: regl.buffer([
                    [0, 0, PARAMS.axis.zAxis.x],
                    [0, 0, PARAMS.axis.zAxis.y],
                ]),
            },
            endpointCount: 2,
            endpointAttributes: {
                pos: regl.buffer([
                    [0, 0, PARAMS.axis.zAxis.x],
                    [0, 0, PARAMS.axis.zAxis.y],
                ]),
            },
        });

        draw({
            coords: coords.map((e) => [e.x, e.y, e.z]),
            colors: coords.map((e) => e.color),
            numPoints: coords.length,
        });
    });
});
