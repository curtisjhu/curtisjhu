const regl = require("regl")();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
		source1: [-1, 0.2],
		source2: [-1, -0.2],
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
	uniform vec2 source1, source2;

    void main() {
		float speed = iTime*0.3;
		float frequency = 30.0;

		// inverse square law
		// cosine waves
		vec3 wave1 = vec3(cos(frequency*(length(uv-source1)+speed)));
		vec3 wave2 = vec3(cos(frequency*(length(uv-source2)+speed)));

      	gl_FragColor = vec4(wave2+wave1, 1);
    }`,

});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw({});
});
