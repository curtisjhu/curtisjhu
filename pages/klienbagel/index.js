const regl = require("regl")();

var vertices = regl.buffer();

const drawShape = regl({
	uniforms: {
	},
	
	attributes: {
		position: vertices
	},
	count: vertices.length,
	primitive: "triangle strip",
	vert: glslify("vs.glsl"),
	frag: glslify("fs.glsl")
})

