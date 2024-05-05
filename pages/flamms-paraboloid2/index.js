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
	zoomSpeed: 0.8
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
		color: regl.prop("color"),
		r_s: regl.prop("r_s")
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
	uniform float r_s;

	varying vec2 uv, b;

	attribute vec2 uInt, vInt;


	#define BLACKHOLE vec2(1.0)

	vec3 flamms_paraboloid(vec2 uv) {
		float r = length(uv - BLACKHOLE);

		float w = 2.0 * sqrt(r_s * (r - r_s));
		return vec3(uv, w);
	}

	void main() {
		uv = position;
		b = barycentric;

		// map our vector on the uv plane into xyz vector
		vec3 finalPos = flamms_paraboloid(position);

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
			color: [PARAMS.color.x, PARAMS.color.y, PARAMS.color.z],
			r_s: 0.3
		});
	})
})