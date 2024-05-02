const { utils } = require("./utils");

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

    #define SEED 134.0

    ${utils}

    void main() {

        // sky color
		vec4 col = vec4(135./255., 206./255., 235./255., 1.0);

        float t = iTime * 0.01;
        vec2 p = uv + vec2(t, 0.);


        vec3 sun = vec3(1.0, 1.0, .3);
        vec3 ro = vec3(0.0, 0.0, -5.);
        vec3 rd = normalize(vec3(uv, 1.0));

        // ro.z + rd.z * t = 0
        // ro.x + rd.x * t = x_pl
        // ro.y + rd.y * t = y_pl
        // x_pl^2 + y_pl^2 < r^2
        float x = ro.x + rd.x * (-ro.z/rd.z);
        float y = ro.y + rd.y * (-ro.z/rd.z);

        float r = distance(vec2(x,y), sun.xy);


        // sun first
        col = mix(vec4(245./255., 226./255., 79./255., .7), col, smoothstep(0.1, 1.8, r - sun.b));
        col = mix(vec4(0.0), col, smoothstep(0.0, 0.1, r - sun.b));

        // clouds
        col = mix(vec4(0.8, 0.8, 0.8, 0.8), col, fbm(p));
        
      	gl_FragColor = col;
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
