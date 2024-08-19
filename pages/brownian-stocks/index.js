const regl = require("regl")();

// Statistical Physics have been the early influences for modeling financial assets.

var values = regl.buffer([[-1, -1], [1, 0.5]]);
function updateValues() {
	// values += Math.random();
}

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: regl.prop("data"),
    },
	count: (cx, props) => props.data.length,
	primitive: "lines",
    vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
    	gl_Position = vec4(position, 0, 1);
    }`,
    frag: `
    precision mediump float;
	uniform float iTime;
    void main() {
		vec3 col = vec3(sin(iTime));
      	gl_FragColor = vec4(col, 1);
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

	updateValues();
    draw({
		data: values
	});
});
