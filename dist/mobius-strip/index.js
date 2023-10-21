// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");
const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const glsl = require("glslify");
const camera = require("regl-camera")(regl, {
	distance: 10,
	theta: Math.PI/3,
	phi: -Math.PI/3,
	zoomSpeed: 0.5,
	rotateSpeed: 0.5
});

const PARAMS = {
	// interval
	u: { x: -1, y: 1 },
	v: { x: 0, y: 2*Math.PI },
	numPoints: 1000,
	R: 3,
	color: { x: 2.32, y: 1.1, z: 1.16 },
	contrast: 0.2
}
const { Pane } = require("tweakpane");
const pane = new Pane({
	title: "Mobius Strip"
})
pane.addInput(PARAMS, "numPoints", {
	format: (e) => e.toFixed(0)
})
pane.addInput(PARAMS, "R");
pane.addInput(PARAMS, "contrast");
pane.addInput(PARAMS, "color");


const mesh = require("glsl-solid-wireframe")(createMesh(PARAMS));

const drawStrip = regl({
	uniforms: {
		R: regl.prop("R"),
		contrast: regl.prop("contrast"),
		color: regl.prop("color")
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
	attribute vec2 position;
	uniform float R;
	uniform mat4 projection, view;
	attribute vec2 barycentric;

	varying vec2 b;
	varying vec2 uv;

	vec3 parametricFunc(vec2 uv) {
		// will this overflow??

		float x = (R + uv.x * cos(uv.y/2.0)) * cos(uv.y);
		float y = (R + uv.x * cos(uv.y/2.0)) * sin(uv.y);
		float z = uv.x*sin(uv.y/2.0);
		return vec3(x, y, z);
	}

	void main() {
		b = barycentric;
		uv = position;

		// map our vector on the uv plane into xyz vector
		vec3 finalPos = parametricFunc(position);

		gl_Position = projection*view*vec4(finalPos, 1);
	}`,
	frag: glsl(`
	#extension GL_OES_standard_derivatives : enable
	precision mediump float;
	#pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)

	varying vec2 b;
	varying vec2 uv;
	uniform float contrast;
	uniform vec3 color;


	void main() {
		vec3 col = 0.5*cos(uv.xyx+color);
		col = mix(vec3(contrast), col, vec3(grid(b, 0.2)));
		gl_FragColor = vec4(col, 1);
	}`)
});

regl.frame((c) => {
	regl.clear({
		color: [1, 1, 1, 1],
		depth: 1
	})

	camera((state) => {
		drawStrip({
			uInt: [PARAMS.u.x, PARAMS.u.y],
			vInt: [PARAMS.v.x, PARAMS.v.y],
			R: PARAMS.R,
			contrast: PARAMS.contrast,
			color: [PARAMS.color.x, PARAMS.color.y, PARAMS.color.z]
		});
	})
})