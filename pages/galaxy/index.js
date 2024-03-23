// for entire u, v domain and range.
// that uv is given to us via the positions buffer.

const createMesh = require("./createMesh");

const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const glsl = require("glslify");
const camera = require("regl-camera")(regl, {
	distance: 3,
	theta: Math.PI / 2
});

const PARAMS = {
	// interval
	u: { x: 0, y: Math.PI },
	v: { x: 0, y: Math.PI },
	numPoints: 1000
}

const mesh = require("glsl-solid-wireframe")(createMesh(PARAMS));

const drawBottle = regl({
	uniforms: {
		color: regl.prop("color")
	},
	attributes: {
		position: mesh.positions,
		barycentric: mesh.barycentric,
	},
	elements: mesh.cells,
	vert: `
	precision mediump float;
	attribute vec2 position, barycentric;
	uniform mat4 projection, view;

	varying vec2 uv, b;

	vec3 parametricFunc(vec2 uv) {

		float x = ...;
		float y = ...;
		float z = ...;
		return vec3(x, y, z);
	}

	void main() {
		uv = position;
		b = barycentric;

		// map our vector on the uv plane into xyz vector
		vec3 finalPos = vec3(position, 0);

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
			uInt: [PARAMS.u.x, PARAMS.u.y],
			vInt: [PARAMS.v.x, PARAMS.v.y],
			R: 0.2,
			P: 0.3,
			color: [0.1, 0.5, 0.1]
		});
	})
})