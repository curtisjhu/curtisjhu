// references
// https://inria.hal.science/inria-00596050/document
// https://www.shadertoy.com/view/XlsBDf
// Basically Navier-Stokes theorem over single pass of a shader

const regl = require("regl")();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: regl.buffer([
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
        ]),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec2 position;
	varying vec2 uv;
    void main() {
		uv = position;
    	gl_Position = vec4(position, 0, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec2 uv;
	uniform float iTime;
    void main() {

		vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
      	gl_FragColor = vec4(col, 1);
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
