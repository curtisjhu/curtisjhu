const regl = require("regl")({ extensions: ["oes_standard_derivatives"] });
const camera = require("regl-camera")(regl, {
	distance: 20,
	theta: Math.PI/2,
	phi: Math.PI/6,
	center: [0, 2.5, 0],
	zoomSpeed: 0.4,
	rotationSpeed: 0.5
});
const mesh = require("glsl-solid-wireframe")(require("bunny"));

const draw = regl({
    frag: `
    #extension GL_OES_standard_derivatives : enable
    precision mediump float;
    #define GLSLIFY 1
    #define GLSLIFY 1
     
    float gridFactor (vec2 vBC, float width, float feather) {
    float w1 = width - feather * 0.5;
    vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y);
    vec3 d = fwidth(bary);
    vec3 a3 = smoothstep(d * w1, d * (w1 + feather), bary);
    	return min(min(a3.x, a3.y), a3.z);
    }
    
    float gridFactor (vec2 vBC, float width) {
      vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y);
      vec3 d = fwidth(bary);
      vec3 a3 = smoothstep(d * (width - 0.5), d * (width + 0.5), bary);
      return min(min(a3.x, a3.y), a3.z);
    }

    varying vec2 b;
    void main () {
      gl_FragColor = vec4(vec3(gridFactor(b, 1.0)), 1.0);
    }
  	`,
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
    attributes: {
        position: mesh.positions,
        barycentric: mesh.barycentric,
    },
    elements: mesh.cells,
});

regl.frame(() => {
    regl.clear({ color: [1, 1, 1, 1], depth: 1 });
    camera(draw);
});
