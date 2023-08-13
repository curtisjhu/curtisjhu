const regl = require("regl")({extensions: ['oes_standard_derivatives']});
const glslify = require("glslify");
var camera = require('regl-camera')(regl, {
  distance: 20,
  center: [0, 5, 0],
  theta: Math.PI * 0.5,
  phi: 0.0
});
const mesh = require('glsl-solid-wireframe')(require('bunny'));

const drawShape = regl({
	attributes: {
		position: mesh.positions,
		barycentric: mesh.barycentric
	},
	elements: mesh.cells,
	vert: `
		precision mediump float;
		uniform mat4 projection, view;
		attribute vec3 position;
		attribute vec2 barycentric;
		varying vec2 b;
		void main () {
			b = barycentric;
			gl_Position = projection * view * vec4(position, 1);
		}
	`,
	frag: glslify`
		#extension GL_OES_standard_derivatives : enable
		precision mediump float;
		#pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)
		varying vec2 b;
		void main () {
		gl_FragColor = vec4(vec3(grid(b, 1.0)), 1);
		}
  	`,
});

regl.frame((context) => {
	regl.clear({ color: [1, 1, 1, 1], depth: 1 });

	// camera adds in projection, view attributes
	camera(drawShape);
})

