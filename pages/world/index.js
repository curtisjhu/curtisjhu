const regl = require("regl")();
const camera = require("regl-camera")(regl, {
	theta: Math.PI/2,
	phi: -Math.PI/3,
    center: [0, 0, 0]
    
});
const createMesh = require("./createMesh");
const { Pane } = require("tweakpane")
const TweakpaneLatex = require("tweakpane-latex")

const pane = new Pane({
    title: "World Generation"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# World / terrain Generation

Creating a random, pseudo-realistic terrain using a random seed.

`,
  border: false,
  markdown: true,
});


var sp = new URLSearchParams(window.location.search);
console.log(sp.get("seed"))
const PARAMS = {
	seed: sp.get("seed") || 1,
    numPoints: 4000
}
pane.addInput(PARAMS, "seed")
    .on("change", (ev) => {
        if (sp.has("seed")) {
            sp.set("seed", ev.value);
            window.location.search = sp.toString();
        } else {
            window.location.href += "?seed="+ev.value
        }
})

var range = 2;
var buffer = createMesh({
	u: {
		x: -range,
		y: range,
	},
	v: {
		x: -range,
		y: range
	},
	numPoints: PARAMS.numPoints
})


const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: regl.prop("buffer"),
    },
    count: regl.prop("count"),
    vert: `
    precision mediump float;
    attribute vec2 position;
	varying vec3 uv;
	varying vec3 normal;
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

    float fbm(in vec2 pos) {
        float frequency = 1.0;
        float amplitude = 1.0;
        float value = 0.0;

        const int octaves = 6;

        for (int i = 0; i < octaves; i++) {
            value += amplitude * noise(frequency * pos);
            amplitude *= 0.5;
            frequency *= 2.0;
        }

        return value;
    }

    vec3 normalVec(in vec2 pos) {
        float delta = 0.01;
        float df_dx = (fbm(pos + vec2(delta, 0.0)) - fbm(pos)) / delta;
        float df_dy = (fbm(pos + vec2(0.0, delta)) - fbm(pos)) / delta;
        return vec3(-df_dx, 1.0, df_dy);
    }

    void main() {
        normal = normalVec(position);
		uv = vec3(position, fbm(position));
    	gl_Position = projection * view * vec4(uv, 1);
    }`,
    frag: `
    precision mediump float;
	varying vec3 uv;
	varying vec3 normal;

	uniform float iTime;
    void main() {
        vec3 lightSource = vec3(1.0, 1.0, 1.0);
        vec3 lightRay = lightSource - uv;

        float intensity = dot(lightRay, normal);
		vec3 col = vec3(0.058, 0.25, 0.086) * intensity;
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
			buffer: buffer.positions,
            count: buffer.positions.length
		});
	})
});

