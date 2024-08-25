const { utils } = require("./utils");
const regl = require("regl")();

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex")

const pane = new Pane({
    title: "WARNING: GPU INTENSIVE"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Volumetric Clouds

Usually taking derivatives in three dimensions require 4 to 6 samples of the volume to find a normal vector.

Recall directional gradients. Basically, the gradient projected on a unit vector of choice:
$$ \\nabla_v f(x) = \\nabla f(x) \\cdot \\frac{\\textbf{v}}{|v|}$$

This allows us to find the gradient only sampling twice (at current position and current position with a small step towards the light).

Based on the [iquilez blog post](https://iquilezles.org/articles/derivative/)
`,
  border: false,
  markdown: true,
});

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
	varying vec2 uv;
	uniform float iTime;
	uniform float propRatio;

    #define SEED 134.0

    ${utils}

    float map(in vec3 p) {
        return fbm(p);
    }

    const vec3 sundir = vec3(0.30, 0.0, 1.0);
    void main() {

        vec2 st = uv;
        st.y = st.y*propRatio;

        float cameraDist = 5.0;
        vec3 ro = vec3(0.0, 0.0, -cameraDist);
        vec3 rd = normalize(vec3(st, 1.0));

        // background
        vec3 col = vec3(0.45,0.5,0.65) - rd.y*0.2*vec3(0.8,0.8,1.0) + 0.15*0.55;

        // sun
        float sun = clamp(dot(sundir, rd), 0.0, 1.0);
        col += 0.3*vec3(1.0,0.6,0.1)*pow( sun, 8.0 ); 

        // clouds
        float cloudTop = -0.5;
        float cloudBot = -3.0;
        float tTop = (cloudTop-ro.y)/rd.y;
        float tBot = (cloudBot-ro.y)/rd.y;
        
        if (tTop < 0.0 || tTop > 20.0) {
      	    gl_FragColor = vec4(col, 1.0);
            return;
        }

        // clouds
        float eps = 0.2;
        vec4 sum = vec4(0.0);
        const float dt = 0.02;
        float t = tTop;
        for (int i = 0; i < 60; i++) {
            vec3 p = ro + rd*t;
            float den = map(p, 5);

            // hit cloud
            if (den > 0.01) {
                float dif = clamp((den - map(p+eps*sundir, 5))/eps, 0.0, 1.0 );
                vec3  lin = vec3(0.65,0.65,0.75)*1.1 + 0.8*vec3(1.0,0.6,0.3)*dif;
                vec4  col = vec4( mix( vec3(1.0,0.93,0.84), vec3(0.25,0.3,0.4), den ), den );
                col.xyz *= lin;

                // fog
                col.xyz = mix(col.xyz, vec3(0.3), 1.0-exp2(-0.1*t));

                // composite front to back
                col.w    = min(col.w*8.0*dt,1.0);
                col.rgb *= col.a;
                sum += col*(1.0-sum.a);
            }
            t += dt;
            if (t > tBot || sum.a > 0.99) break;
        }
        
        sum = clamp(sum, 0.0, 1.0);
        
        col = col * (1.0 - sum.w) + sum.rgb;
      	gl_FragColor = vec4(col, 1.0);
    }`,
});

regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw();
});
