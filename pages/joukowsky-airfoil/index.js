const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const {cfuncs} = require("./cfuncs.js")

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex");


const PARAMS = {
	transform: true,
	offsetX: -0.25,
	offsetY: 0.16,
	overlay: false,
	flip: false,
}
const pane = new Pane({
    title: "Joukowsky's Airfoil"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# The Joukowsky's Airfoil
How does one mathematically describe an airplane wing?
This famous airfoil is a very famous complex function that transforms
a complex number $\\zeta$ to a new complex number $f(\\zeta)$.

$$ f(\\zeta)  = \\zeta + \\frac{1}{\\zeta} $$

Here we are mapping a circle on the original complex plane and passing it through the function.
Toggle the 'transform' to see this effect.

Read more here.
<a href="https://complex-analysis.com/content/joukowsky_airfoil.html">Great resource here</a>
<a href="https://rreusser.github.io/joukowsky-airfoil/">Inspired by rreusser</a>

`,
  border: false,
  markdown: true,
});

pane.addInput(PARAMS, "transform");
pane.addInput(PARAMS, "overlay");
pane.addInput(PARAMS, "flip");
pane.addInput(PARAMS, "offsetX", {
	min: -0.5,
	max: 0
});
pane.addInput(PARAMS, "offsetY", {
	min: -0.5, 
	max: 0.5
});


//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
// vec3 hsb2rgb( in vec3 c ){
//     vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
//                              6.0)-3.0)-1.0,
//                      0.0,
//                      1.0 );
//     rgb = rgb*rgb*(3.0-2.0*rgb);
//     return c.z * mix(vec3(1.0), rgb, c.y);
// }

//let JkTransX = (x,y) => rd*x-0.15 + (rd*x-0.15)/((rd*x-0.15)*(rd*x-0.15)+(rd*y+0.23)*(rd*y+0.23));
//let JkTransY = (x,y) => rd*y+0.23 - (rd*y+0.23)/((rd*x-0.15)*(rd*x-0.15)+(rd*y+0.23)*(rd*y+0.23));
const draw = regl({
    uniforms: {
        u_resolution: (ctx) => {
			if (ctx.viewportWidth > ctx.viewportHeight) {
				return [ctx.viewportHeight/ctx.viewportWidth,1]
			}
            return [1, ctx.viewportWidth/ctx.viewportHeight]
        },
		gridWidth: 1,
		opacity: 0.9,
		pixelRatio: (ctx) => ctx.pixelRatio,
		t: (ctx) => ctx.time,
		scale: regl.prop("scale"),
		gridSpacing: 2,
		offsetX: regl.prop("offsetX"),
		offsetY: regl.prop("offsetY"),
		transform: regl.prop("transform"),
		flip: regl.prop("flip"),
		overlay: regl.prop("overlay"),
    },
    attributes: {
        position: [
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, -1],
		],

	},
    count: 6,
    vert: `
    precision highp float;
    attribute vec2 position;
	varying vec2 uv;

    void main() {
		uv = position;
    	gl_Position = vec4(uv, 0, 1);
    }`,
    frag: `
    #extension GL_OES_standard_derivatives : enable
  	#define PI 3.141592653589793238
  	#define TO_RADIANS 0.01745329251
  	precision mediump float;
	varying vec2 uv;
	uniform vec2 u_resolution;
	uniform float pixelRatio, gridWidth, opacity, t, gridSpacing, scale;
	uniform float offsetX, offsetY;
	uniform bool transform, flip, overlay;

	${cfuncs}

	vec3 hsl2rgb( in vec3 c ){
		vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0,1.0);
		return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
	}

	float gridFactor (vec2 parameter, float width, float feather) {
      float w1 = width - feather * 0.5;
      vec2 d = fwidth(parameter);
      vec2 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
      vec2 a2 = smoothstep(d * w1, d * (w1 + feather), looped);
      return min(a2.x, a2.y);
    }

	vec2 f(vec2 z) {
		return (z + csqrt(cmul(z,z)-4.0)) / 2.0;
	}
	vec2 f_low(vec2 z) {
		return (z - csqrt(cmul(z,z)-4.0)) / 2.0;
	}

	vec3 circle(vec2 z, vec2 offset, vec3 col) {
		float radius = distance(z, offset);

		float w = 0.1;

		// why on earth is it 1.25????
		float d = distance(offset, vec2(1.25, 0.0));
		float isCircle = 1.0 - smoothstep(d, d-w, radius)*smoothstep(d-w, d, radius);
		col = mix(vec3(0.0), col, isCircle);
		return col;
	}

    void main() {
		vec2 z = (uv.xy) * scale / u_resolution.xy;

		vec2 zz = z;
		// insert function
		if (transform) {
			z = f(z);
			zz = f_low(zz);

			if (overlay) {
				if (flip)
					z = zz;
				else
					zz = z;
			}
		}

		// to hue
		vec2 polar = cpolar(z).gr;

		float L = 1.0 - pow(0.5, polar.r);
		float H = polar.g / (2.0 * PI);

		// H hue, 1.0 saturation, L lightness
		vec3 hsl = vec3(H, 1.0, L);
		vec3 col = hsl2rgb(hsl);

		// apply polar gridlines
		polar.g = polar.g * 4.0 / (PI);
		polar.r = polar.r*gridSpacing;
		float gridFact = gridFactor(polar, 0.4 * gridWidth * pixelRatio, 1.0);
		col = mix(vec3(0.6), col, opacity * gridFact);

		// apply circle
		vec2 offset = vec2(offsetX, offsetY);
		col = circle(z, offset, col); // top
		col = circle(zz, offset, col); // cottom

      	gl_FragColor = vec4(col, 1);
    }`,
});

const scale = 3.0
regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    draw({
		scale: scale,
		transform: PARAMS.transform,
		flip: PARAMS.flip,
		overlay: PARAMS.overlay,
		offsetX: PARAMS.offsetX,
		offsetY: PARAMS.offsetY
	});
});



