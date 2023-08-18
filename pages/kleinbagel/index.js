// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");

const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const glsl = require("glslify");
const camera = require("regl-camera")(regl, {
	distance: 15,
	theta: Math.PI / 3,
	phi: -Math.PI / 4
});
const wireframe = require("glsl-solid-wireframe");
const { Pane } = require("tweakpane");

const PARAMS = {
	// interval
	u: { x: 0, y: 2*Math.PI },
	v: { x: 0, y: 2*Math.PI },
	numPoints: 10100,
	color: { x: 0.1, y: 0.6, z: 0.1 },
	R: 3.0,
}

const pane = new Pane({
	title: "Klein Bagel"
});
pane.addInput(PARAMS, "color");
pane.addInput(PARAMS, "R", {
	min: 2
}).on("change", (ev) => {
	mesh = wireframe(createMesh(PARAMS));
});

var mesh = wireframe(createMesh(PARAMS));

const drawBagel = regl({
	uniforms: {
		color: regl.prop("color"),
		R: regl.prop("R")
	},
	attributes: {
		position: mesh.positions,
		barycentric: mesh.barycentric,
		uInt: regl.prop("uInt"),
		vInt: regl.prop("vInt"),
	},
	elements: mesh.cells,
	vert: `
	precision mediump float;
	attribute vec2 position, barycentric;

	uniform mat4 projection, view;
	uniform float R;

	varying vec2 uv, b;

	vec3 parametricFunc(vec2 uv) {
		// will this overflow??

		float x = (R + cos(uv.x/2.0)*sin(uv.y) - sin(uv.x/2.0)*sin(2.0*uv.y)) * cos(uv.x);
		float y = (R + cos(uv.x/2.0)*sin(uv.y) - sin(uv.x/2.0)*sin(2.0*uv.y)) * sin(uv.x);
		float z = (sin(uv.x/2.0)*sin(uv.y) + cos(uv.y/2.0)*sin(2.0*uv.y));
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
		drawBagel({
			uInt: [PARAMS.u.x, PARAMS.u.y],
			vInt: [PARAMS.v.x, PARAMS.v.y],
			R: PARAMS.R,
			color: [PARAMS.color.x, PARAMS.color.y, PARAMS.color.z]
		});
	});
})