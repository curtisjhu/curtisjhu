const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const {cfuncs} = require("./cfuncs.js")
const mouseWheel = require("mouse-wheel");
const mouseMove = require("mouse-change");

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex");
const { functions } = require("./funcs");
const glslify = require("glslify");


const createMesh = require("./createMesh");
const camera = require("regl-camera")(regl, {
	distance: 3,
	theta: Math.PI / 2,
	phi: Math.PI / 4
});


var params = new URLSearchParams(document.location.search);
var currentFunc = params.get("function") ? params.get("function") : "1";
console.log(currentFunc)
const PARAMS = {
	function: parseInt(currentFunc),
	u: {x: -Math.PI, y: Math.PI},
	v: {x: -Math.PI, y: Math.PI},
	numPoints: 5000,
	overlayDomainColoring: true,
	useRealAxis: false
}
const pane = new Pane({
    title: "Riemann Surfaces (Prototype I)"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Riemann Surfaces

Definitely coming back to fix this one. Lots of problems.
`,
  border: false,
  markdown: true,
});


var optionList = {};
for (let i =0; i < functions.length; i++) {
	optionList[functions[i]["text"]] = i;
}
pane.addInput(PARAMS, "function", {
	options: optionList
}).on("change", function(ev) {
	document.location.search = "?function="+ev.value;
})
pane.addInput(PARAMS, "useRealAxis");
pane.addInput(PARAMS, "overlayDomainColoring");

const mesh = require("glsl-solid-wireframe")(createMesh(PARAMS));

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

console.log(PARAMS.function)
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
		offsetY: regl.prop("offsetY"),
		overlayDomainColoring: regl.prop("overlayDomainColoring"),
		useRealAxis: regl.prop("useRealAxis")
    },
    attributes: {
		position: mesh.positions,
		barycentric: mesh.barycentric,
	},
	elements: mesh.cells,
    vert: `
    precision highp float;
	varying vec4 finalPos;
	attribute vec2 position, barycentric;
	uniform mat4 projection, view;
	varying vec2 b;
	uniform bool useRealAxis;

	${cfuncs}

	vec4 f(vec2 z) {
		vec2 original = z;
		${functions[PARAMS.function].f}
		return vec4(original, z);
	}

    void main() {
		b = barycentric;
		finalPos = f(position);

		vec3 lastPos = finalPos.xyz;
		if (useRealAxis) {
			lastPos = finalPos.xyw;
		}
		
    	gl_Position = projection*view*vec4(lastPos, 1);
    }`,
    frag: (`
    #extension GL_OES_standard_derivatives : enable
  	#define PI 3.141592653589793238
  	#define TO_RADIANS 0.01745329251
  	precision mediump float;
	varying vec4 finalPos;
	varying vec2 b;
	uniform vec2 u_resolution;
	uniform float pixelRatio, gridWidth, opacity, t, gridSpacing, scale;
	uniform float offsetX, offsetY;
	uniform bool useRealAxis, overlayDomainColoring;

	${cfuncs}

	vec3 hsl2rgb( in vec3 c ){
		vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0,1.0);
		return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
	}

	vec3 domainColoring(in vec2 uv) {
		vec2 polar = cpolar(uv).gr;
		float L = 1.0 - pow(0.5, polar.r);
		float H = polar.g / (2.0 * PI);

		// H hue, 1.0 saturation, L lightness
		vec3 hsl = vec3(H, 1.0, L);
		return hsl2rgb(hsl);
	}

	vec3 colorWheel(in float arg) {
		arg = arg / (2.0 * PI);
		vec3 hsl = vec3(arg, 1.0, 0.3);
		return hsl2rgb(hsl);
	}

    void main() {

		
		vec3 col = colorWheel(finalPos.w);
		if (useRealAxis) {
			col = colorWheel(finalPos.z);
		}

		if (overlayDomainColoring) {
			col = domainColoring(finalPos.zw);
		}

      	gl_FragColor = vec4(col, 1);
    }`),
});

var s = 1.0;
var gridSpacing = 2;
var lastTimeWheel = 0;
var lastTimeMove = 0;
var lastPosition = { x: 0, y: 0};

var offsets = { x: 0, y: 0};
regl.frame(({ time }) => {
    regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
    });

	camera((state) => {
		draw({
			gridSpacing: gridSpacing,
			scale: s,
			offsetX: offsets.x,
			offsetY: offsets.y,
			uInt: [PARAMS.u.x, PARAMS.u.y],
			vInt: [PARAMS.v.x, PARAMS.v.y],
			useRealAxis: PARAMS.useRealAxis,
			overlayDomainColoring: PARAMS.overlayDomainColoring
		});
	})
});



