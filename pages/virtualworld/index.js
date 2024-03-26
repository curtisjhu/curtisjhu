const regl = require("regl")();
const camera = require("regl-camera")(regl, {
	theta: Math.PI/2,
	phi: -Math.PI/3
});
const createMesh = require("./createMesh");


const PARAMS = {
	seed: 1
}

var range = 1;
var buffer = createMesh({
	u: {
		x: -range,
		y: range,
	},
	v: {
		x: -range,
		y: range
	},
	numPoints: 100
})

console.log(buffer)

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: regl.prop("buffer"),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec2 position;
	varying vec3 uv;
	uniform mat4 projection, view;

    float rand (in vec2 st) {
        return fract(sin(dot(st.xy,
                         vec2(12.9898, 78.233)))
                 * 43758.5453123 * float(${PARAMS.seed}));
    }

    float noise(in vec2 pos) {
        vec2 i = floor(pos);
        vec2 f = fract(pos);

        float a = rand(i);
        float b = rand(i + vec2(1.0, 0.0));
        float c = rand(i + vec2(0.0, 1.0));
        float d = rand(i + vec2(1.0, 1.0));

        vec2 u = smoothstep(0.,1.,f);

        return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
    }

    void main() {
		uv = vec3(position, noise(position));
    	gl_Position = projection * view * vec4(uv, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec3 uv;
	uniform float iTime;
    void main() {

		vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
      	gl_FragColor = vec4(col, 1);
    }`,
});

regl.frame(({ time }) => {
	camera((state) => {
		regl.clear({
			color: [1, 1, 1, 1],
			depth: 1,
		});

		draw({
			buffer: buffer.positions
		});
	})
});

