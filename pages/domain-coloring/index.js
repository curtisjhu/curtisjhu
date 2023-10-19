const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const {cfuncs} = require("./cfuncs.js")
const mouseWheel = require("mouse-wheel");
const mouseMove = require("mouse-change");

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex");
const { functions } = require("./funcs");


var params = new URLSearchParams(document.location.search);
var currentFunc = params.get("function") ? params.get("function") : "f(z)=z";
console.log(currentFunc)
const PARAMS = {
	function: currentFunc,
	preserveGridSpacing: false
}
const pane = new Pane({
    title: "Domain Coloring (Prototype I)"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Domain coloring
Basically you map a complex number $z$ to another complex number $z'$.
Here, each $z$, which is assigned a color on a colorwheel,
are mapped onto a new complex plane seen here.

## Controls
DRAG SCROSS, ZOOM
`,
  border: false,
  markdown: true,
});

pane.addInput(PARAMS, "preserveGridSpacing")

var optionList = {};
for (let i =0; i < functions.length; i++) {
	optionList[functions[i]["text"]] = { index: i, text: functions[i].text};
}
pane.addInput(PARAMS, "function", {
	options: optionList
}).on("change", function(ev) {
	document.location.search = "?function="+ev.value.text;
})


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
		gridSpacing: regl.prop("gridSpacing"),
		offsetX: regl.prop("offsetX"),
		offsetY: regl.prop("offsetY")
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
		${functions.find((v) => v["text"] == currentFunc).f}
		return z;
	}

    void main() {
		vec2 z = (uv.xy + vec2(offsetX, offsetY)) * scale / u_resolution.xy;
		vec2 rect = z;
		

		// insert function
		z = f(z);

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

		// apply rectangular grid lines
		// float gridFact2 = gridFactor(z, 0.4 * gridWidth * pixelRatio, 1.0);
		// col = mix(vec3(0.3), col, opacity * gridFact2);

      	gl_FragColor = vec4(col, 1);
    }`,
});

var s = 1.0;
var gridSpacing = 2;
var lastTimeWheel = 0;
var lastTimeMove = 0;
var lastPosition = { x: 0, y: 0};

var offsets = { x: 0, y: 0};
regl.frame(({ time }) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

	mouseWheel(function(dx, dy) {
		if (time - lastTimeWheel < 0.3) return;

		var inc = dy > 0 ? 0.1 : -0.1;
		var maxScale = 10;
		s = Math.min(Math.max(1, s + inc), maxScale);

		// or preserve the number with
		if (PARAMS.preserveGridSpacing) {
			gridSpacing = maxScale;
		} else {
			gridSpacing = 3.0 * Math.exp(-0.2*s);
		}

		lastTimeWheel = time;
	})

	mouseMove(function(button, x, y) {
		if (time - lastTimeMove < 0.05) return;

		var moveDist = 0.1 * Math.exp(-0.4*s);
		if (button == 1) {
			offsets.x += x - lastPosition.x > 0 ? moveDist : -moveDist;
			offsets.y += y - lastPosition.y > 0 ? -moveDist : moveDist;
		}
		lastPosition.x = x;
		lastPosition.y = y;

		lastTimeMove = time;
	})


    draw({
		gridSpacing: gridSpacing,
		scale: s,
		offsetX: offsets.x,
		offsetY: offsets.y
	});
});



