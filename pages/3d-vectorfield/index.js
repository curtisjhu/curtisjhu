const regl = require("regl")();
const camera = require("regl-camera")(regl, {
    distance: 3
});


// create a bunch of evenly distributed points
// calculate their vector at that point
// create a line respectively
// then display the lines black on top of black background
// according to its speed/length, create a moving effect with colors.


const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: []
    },
    primitive: "lines",
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
      	gl_FragColor = vec4(col, 1);
    }`,
});

regl.frame(({ time }) => {

    camera(() => {
        draw();
    })
});

