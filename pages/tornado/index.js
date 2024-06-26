const regl = require("regl")();
const {utils} = require("util");

const draw = regl({
    uniforms: {
        iTime: (ctx) => ctx.time,
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
attribute vec2 position;
attribute float propRatio;
#define nStep 35
#define nStepLight 4
#define maxDist 10.0

${utils}



void main() {

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord;
    uv.y = fragCoord.y*propRatio;
    
    float cameraDist = 5.0;
    float time = 0.3 * iTime;
    vec3 ro = vec3(0.0, 1.0, cameraDist);
    vec3 rd = normalize( vec3( uv, -2.0) );
    
    }
    
    gl_FragColor = vec4(col,1.0);
}
`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
