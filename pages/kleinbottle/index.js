// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");

const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const glsl = require("glslify");
const wireframe = require("glsl-solid-wireframe");
const camera = require("regl-camera")(regl, {
	distance: 10,
	theta: Math.PI / 2,
	center: [0, 2, 0],
	zoomSpeed: 0.5
});
const { Pane } = require("tweakpane");
const TweakpaneInfodumpPlugin = require("tweakpane-plugin-infodump");
const pane = new Pane({
	title: "Klein Bottle"
})

pane.registerPlugin(TweakpaneInfodumpPlugin);

const PARAMS = {
	// interval
	u: { x: 0, y: Math.PI },
	v: { x: 0, y: 2*Math.PI },
	numPoints: 10000,
	color: { x: 0.1, y: 0.6, z: 0.1 },
	slice: 2*Math.PI
}

pane.addInput(PARAMS, "color");
pane.addInput(PARAMS, "slice", {
	min: 0.3,
	max: 2*Math.PI
}).on("change", (ev) => {
	mesh = wireframe(createMesh({...PARAMS, v: { x: 0, y: ev.value }}));
})
pane.addBlade({
    view: "infodump",
    content:
        "Parametrization provided by Wikipedia",
})

var mesh = wireframe(createMesh(PARAMS));

const drawBottle = regl({
	uniforms: {
		color: regl.prop("color")
	},
	attributes: {
		position: regl.prop("position"),
		barycentric: regl.prop("barycentric"),
		uInt: regl.prop("uInt"),
		vInt: regl.prop("vInt"),
	},
	elements: regl.prop("elements"),
	vert: `
	precision mediump float;
	attribute vec2 position, barycentric;
	uniform mat4 projection, view;

	varying vec2 uv, b;

	attribute vec2 uInt, vInt;

	vec3 parametricFunc(vec2 uv) {
		// will this overflow??

		float x = (-2.0/15.0)*cos(uv.x)*
					(
						3.0*cos(uv.y) - 30.0*sin(uv.x) + 90.0*pow(cos(uv.x),4.0)*sin(uv.x) -
						60.0*pow(cos(uv.x), 6.0)*sin(uv.x) + 5.0*cos(uv.x)*cos(uv.y)*sin(uv.x)
					);
		float y = (-1.0/15.0) * sin(uv.x) *
					(
						3.0*cos(uv.y) - 3.0*pow(cos(uv.x), 2.0)*cos(uv.y) - 48.0*pow(cos(uv.x), 4.0)*cos(uv.y) +
						48.0*pow(cos(uv.x), 6.0)*cos(uv.y) - 60.0*sin(uv.x) + 5.0*cos(uv.x)*cos(uv.y)*sin(uv.x) -
						5.0*pow(cos(uv.x), 3.0)*cos(uv.y)*sin(uv.x) - 80.0*pow(cos(uv.x), 5.0)*cos(uv.y)*sin(uv.x) +
						80.0*pow(cos(uv.x), 7.0)*cos(uv.y)*sin(uv.x)
					);
		float z = (2.0/15.0)*(3.0 + 5.0*cos(uv.x)*sin(uv.x))*sin(uv.y);
		return vec3(x, y, z);
	}

	void main() {
		uv = position;
		b = barycentric;

		// map our vector on the uv plane into xyz vector
		vec3 finalPos = parametricFunc(position);

		gl_Position = projection*view*vec4(finalPos, 1);
	}`,
	frag: glsl(`
	#extension GL_OES_standard_derivatives : enable
	precision mediump float;
	#pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)

	varying vec2 b;
	uniform vec3 color;
	varying vec2 uv;

	void main() {
		vec3 col = 0.5*cos(uv.xyx+color);
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
		drawBottle({
			position: mesh.positions,
			barycentric: mesh.barycentric,
			elements: mesh.cells,
			uInt: [PARAMS.u.x, PARAMS.u.y],
			vInt: [PARAMS.v.x, PARAMS.v.y],
			color: [PARAMS.color.x, PARAMS.color.y, PARAMS.color.z]
		});
	})
})