const regl = require("regl")();
const d3 = require("../d3.min.js");
const camera = require("regl-camera")(regl, {
    distance: 5,
    center: [0, 0, 0],
    theta: 0,
    phi: 0.0,
});
const { Pane } = require("tweakpane");
const createMesh = require("./createMesh.js");

const pane = new Pane({
    title: "Global Datasets",
});

const PARAMS = {
    dataset: "worldcities",
    u: { x: -Math.PI, y: Math.PI },
    v: { x: 0, y: 2*Math.PI },
	numPoints: 1000
};

pane.addInput(PARAMS, "dataset", {
    options: {
        worldcities: "worldcities.csv",
        airports: "airports.csv",
    },
}).on("change", (ev) => {
});

const sphere = createMesh(PARAMS);
console.log(sphere)

const drawSphere = regl({
    uniforms: {
        radius: 0.95 
    },
    attributes: {
        position: sphere.positions,
    },
    elements: sphere.cells,
    vert: `
	precision mediump float;
	attribute vec2 position;
	uniform mat4 projection, view;
    uniform float radius;

    vec3 sphere(vec2 uv) {
        return vec3(radius*cos(uv.s)*cos(uv.t), radius*cos(uv.s)*sin(uv.t), radius*sin(uv.s));
    }

	void main() {
		gl_Position = projection * view * vec4(sphere(position), 1);
	}
	`,
    frag: `
	precision mediump float;
	void main() {
		gl_FragColor = vec4(0, 0, 0, 1);
	}
	`,
});


var dataset = [];
d3.csv("./worldcities2.csv",
		function(d) {
			// var brightness = d.population/10000000;
            var brightness = 0.9;
            var lat = (d.lat)*Math.PI/180;
            var lng = (d.lng)*Math.PI/180;
			return {
				x: Math.cos(lat)*Math.cos(lng),
				y: Math.cos(lat)*Math.sin(lng),
				z: Math.sin(lat),
				color: [brightness, brightness, brightness]
			}
		}).then(data => dataset = data);

// d3.csv("./airports.csv",
//         function(d) {
//             var brightness = 0.9;
//             var lat = (d.lat)*Math.PI/180;
//             var lng = (d.lng)*Math.PI/180;
// 			return {
// 				x: Math.cos(lat)*Math.cos(lng),
// 				y: Math.cos(lat)*Math.sin(lng),
// 				z: Math.sin(lat),
// 				color: [brightness, brightness, brightness]
//             }
//         }).then(data => dataset = data);

const drawPoints = regl({
    uniforms: {
        radius: 1,
    },
    attributes: {
        position: regl.prop("position"),
        color: regl.prop("color"),
        pointSize: regl.prop("pointSize")
    },
    count: regl.prop("count"),
    primitive: "points",
    vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 col;
    attribute float pointSize;
    uniform mat4 projection, view;

    void main() {
        // color is per vertex-basis
        col = color;
        gl_PointSize = pointSize;
        gl_Position = projection*view*vec4(position, 1);
    }
    `,
    frag: `
    precision mediump float;
    varying vec3 col;

    void main() {
        gl_FragColor = vec4(col, 0.7);
    }
    `
})

regl.frame((context) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });
    camera((state) => {
        drawPoints({
            position: dataset.map((e) => [e.x, e.y, e.z]),
            count: dataset.length,
            color: dataset.map((e) => e.color),
            pointSize: dataset.map((e) => 0.5)
        });
        drawSphere();
    });
});
