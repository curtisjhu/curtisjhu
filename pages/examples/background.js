const regl = require("regl")();
const glslify = require("glslify");

const drawBackground = regl({
    uniforms: {
        color: regl.prop("color"),
    },
    attributes: {
		// rectangle = 2 triangles
		position: [
			[-1, -1],
			[-1, 1],
			[1, -1],
			[-1, 1],
			[1, -1],
			[1, 1],
		]
	},
	count: 6,
    vert: glslify("./shader.vs.glsl"),
    frag: glslify("./shader.fs.glsl"),
});

regl.frame(({ tick }) => {
    drawBackground({
        color: [
            0.25 * Math.cos(tick / 100),
            0.25 * Math.sin(tick / 100),
            0.3 * Math.cos(tick / 100),
        ],
    });
});
