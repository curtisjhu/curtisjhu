const regl = require("regl")();

const drawPoints = regl({
	uniforms: {
		color: regl.prop("color"),
		pointWidth: regl.prop("pointWidth")
	},


	attributes: {
		position: function(context, props) {
			return [[-1 * Math.cos(context.tick / 100), 0.2],
        [Math.sin(context.tick / 100), -0.8],
        [Math.sin(context.tick / 100), 0.8]]
		} 
	},
	count: 3,

	// points, lines, triangles
	// https://github.com/regl-project/regl/blob/gh-pages/API.md#drawing
	primitive: "points",
	vert: `
	precision mediump float;
	attribute vec2 position;
	uniform float pointWidth;
	
	void main() {
		gl_PointSize = pointWidth;
		gl_Position = vec4(position, 0, 1);
	}`,
	frag: `
	precision mediump float;
	uniform vec4 color;
	void main() {
		gl_FragColor = color;
	}`,
})

regl.frame((context) => {
	drawPoints({
		color: [0.1*Math.cos(context.tick / 100)+ 0.1, 0.3, 1.0, 1.0],
		pointWidth: 10.0
	})
})