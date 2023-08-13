const regl = require("regl")();
const glslify = require("glslify");

const drawShape = regl({
	uniforms: {
		iTime: (context, props) => context.time,
		propRatio: (context, props) => {
			return context.viewportHeight / context.viewportWidth;
		}
	},
	
	attributes: {
		position: [[-1, -1], [1, -1], [-1, 1], [1, -1], [-1, 1], [1, 1]]
	},
	count: 6,
	primitive: "triangle",
	vert: glslify("./vs.glsl"),
	frag: glslify("./fs.glsl")
})

regl.frame((context) => {
	drawShape();
})

