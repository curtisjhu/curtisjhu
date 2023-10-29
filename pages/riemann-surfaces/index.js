const regl = require("regl")({
	extensions: ["oes_standard_derivatives"]
});
const {cfuncs} = require("./cfuncs.js")

const { Pane } = require("tweakpane");
const TweakpaneLatex = require("tweakpane-latex");
const { functions } = require("./funcs");


const createMesh = require("./createMesh");
const camera = require("regl-camera")(regl, {
	distance: 10,
	theta: Math.PI / 2,
	phi: -Math.PI / 3
});


var params = new URLSearchParams(document.location.search);
var currentFunc = params.get("function") ? params.get("function") : "1";
console.log(currentFunc)
const PARAMS = {
	function: parseInt(currentFunc),
	u: {x: -Math.PI, y: Math.PI},
	v: {x: -Math.PI, y: Math.PI},
	numPoints: 10000,
	overlayDomainColoring: true,
	useRealAxis: false,
	projection: true,
}
const pane = new Pane({
    title: "Riemann Surfaces"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Riemann Surfaces
Riemann surfaces are complex manifolds of one dimension.

We can map a complex number to another complex number using $f(x+yi)$
$$x + yi \\rightarrow u + vi$$
In this rendering, points are described as 
$(x, y, u)$ with color $(v)$ **OR**
$(x,y,v)$ with color $(u)$

Notice that sometimes, these functions can map $z$ to two separate complex numbers.
These are multivalued functions that can map to separate branches as seen by the various layers for $f(\\zeta) = \\sqrt{\\zeta}$
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
const options = pane.addFolder({
	title: "Options",
	expanded: false
})
options.addInput(PARAMS, "useRealAxis");
options.addInput(PARAMS, "projection");
options.addInput(PARAMS, "overlayDomainColoring");
options.addBlade({
  view: "latex",
  content: `
| Options | Meaning |
| --- | --- |
| useRealAxis | **Draw** using real value as z-axis. Otherwise, use the imaginary value |
| projection | **Draw** z-axis or not? |
| overlayDomainColoring | **Draw** the domain coloring over transformation over. Otherwise, it'll color based off the Imaginary/Real Axis result. | 


`,
  border: false,
  markdown: true,
});

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

var branches = [];

for (var i = 0; i < functions[PARAMS.function].f.length; i++) {
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
			overlayDomainColoring: regl.prop("overlayDomainColoring"),
			useRealAxis: regl.prop("useRealAxis"),
			project: regl.prop("projection")
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
		uniform bool useRealAxis, project;

		${cfuncs}

		vec4 f(vec2 z) {
			vec2 original = z;
			${functions[PARAMS.function].f[i]}
			return vec4(original, z);
		}

		void main() {
			b = barycentric;
			finalPos = f(position);

			vec3 lastPos = finalPos.xyz;
			if (useRealAxis) {
				lastPos = finalPos.xyw;
			}

			if (project == false) {
				lastPos = vec3(finalPos.xy, 0);
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
	branches.push(draw);
}


regl.frame(({ time }) => {
    regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
    });

	camera((state) => {
		for (var i = 0; i < branches.length; i++) {
			var draw = branches[i];
			draw({
				uInt: [PARAMS.u.x, PARAMS.u.y],
				vInt: [PARAMS.v.x, PARAMS.v.y],
				useRealAxis: PARAMS.useRealAxis,
				projection: PARAMS.projection,
				overlayDomainColoring: PARAMS.overlayDomainColoring
			});
		}
	})
});



