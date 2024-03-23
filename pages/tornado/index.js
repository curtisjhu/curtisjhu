const regl = require("regl")();
const d3 = require("../d3.min.js");
const camera = require("regl-camera")(regl, {
    center: [0, 0, 3],
    theta: Math.PI/2,
    phi: -4*Math.PI/9,
    damping: 0.3,
    distance: 40
});

function genPoints() {
    var uniform = d3.randomLcg(0.4212687683098432008)
    
    return d3.range(500).map((i) => {
    
        var range  = 7;
        var z = uniform() * range;

        var R = Math.exp(0.3 * z) * uniform();
        var ang = uniform() * 2 * Math.PI;

        return {
            x: R * Math.cos(ang),
            y: R * Math.sin(ang),
            z: z,
            m: uniform(),
        }
    });
}

var buffer = genPoints();

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: regl.prop("buffer"),
    },

    count: regl.prop("numPoints"),
    primitive: "points",
    vert: `
    precision mediump float;
    attribute vec3 position;
	varying vec2 uv;
    uniform mat4 projection, view;

    float perlinNoise(float x) {
        float i = floor(x);
        float f = fract(x);
        return mix(i, f, f);
        // return mix(rand(i), rand(i+1.0), smoothstep(0.0, 1.0, f));
    }

    vec2 perlin(float z, float t) {
        // (x,y) = perlin_noise(z, t) 

        float range = 2.0;

        return vec2(0.0, 0.0);
    }

    void main() {
		uv = position.xy;
        gl_PointSize = 2.0;
    	gl_Position = projection * view * vec4(position, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec2 uv;
	uniform float iTime;
    void main() {
        vec3 col = vec3(0.0);
      	gl_FragColor = vec4(col, 1);
    }`,
});

const k = 10;
const drawGround =  regl({
    uniforms: {},
    attributes: {
        position: regl.buffer([
            [-k, -k],
            [k, k],
            [-k, k],
            [k, k],
            [-k, -k],
            [k, -k],
        ]),
    },
    count: 6,
    vert: `
    precision mediump float;
    attribute vec2 position;
    uniform mat4 projection, view;
	varying vec3 uv;

    float rand (in vec2 st) {
        return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
    }

    float perlin(in vec2 pos) {
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
        vec2 pos = position;

        float z = perlin(pos);
        uv = vec3(pos, z);

    	gl_Position = projection * view * vec4(uv, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec3 uv;
    void main() {
        vec3 col = mix(vec3(0.7, 0.47, 0.05), vec3(0.058, 0.45, 0.086), uv.z);
      	gl_FragColor = vec4(col, 1);
    }`,
})

regl.frame(({ time }) => {

    camera((state) => {
        regl.clear({
            color: [1, 1, 1, 1],
            depth: 1,
        });

        draw({
            buffer: buffer.map((el) => [el.x, el.y, el.z]),
            numPoints: buffer.length
        });
        drawGround();
    })
});
