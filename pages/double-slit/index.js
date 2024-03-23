const regl = require("regl")();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
		source1: [-1, 0.2],
		source2: [-1, -0.2],
		propRatio: (context, props) => {
			return context.viewportHeight / context.viewportWidth;
		}
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

	uniform float iTime, propRatio;
	uniform vec2 source1, source2;

    void main() {
        
        vec3 col = vec3(0.08);

		float t = iTime*0.3;
		float frequency = 30.0;


        float slitWidth = 0.03;

        float divideX = 0.5;
        float lineWidth = 0.01*propRatio;
        float grad = smoothstep(lineWidth, 0.003*propRatio, abs(uv.x + divideX)) * smoothstep(slitWidth-0.01, slitWidth, abs(uv.y));
        col = mix(col, vec3(0.62, 0.68, 0.71), grad);

        // huygens
        // more of diffraction here.

        // mesh function
        // superposition of waves
        // these waves must bounce off walls.
        // 
        




      	gl_FragColor = vec4(col, 1);
    }`,

});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw({});
});
