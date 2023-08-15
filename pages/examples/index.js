const regl = require('regl')();



const drawTriangle = regl({
	vert: `
	precision mediump float;
	attribute vec2 position;
	void main() {
		gl_Position = vec4(position, 0, 1);
	}`,
	// varyings get passed from vert to frag

	frag: `
	precision mediump float;
	uniform vec4 color;
	void main() {
		gl_FragColor = color;
	}`,

	// only passed to vertex shader
	// for every vertex
	// gives position of each vertex
	// must match "count"
	attributes: {
		// screen varies from -1 to 1 in all axis.
		position: function(context, props) {
			// use context.tick
			// console.log(context.tick, context.time)
			// tick is incrementor, time is in miliseconds
			return [
				[-1*Math.cos(context.tick/100), 0], 
				[Math.sin(context.tick/100), -1], 
				[1, 1]]
		}
	},

	// uniform
	// constants for each frame
	// like a uniform color that changes each frame
	uniforms: {
		// vec4 red
		// color: [1, 0, 0, 1]
		// color: function(context, props) {
		// 	return props.color;
		// }
		color: regl.prop("color")
	},

	// number of vertices
	count: 3,
})


// context
// is a place to store things in between frames.
// contains useful variables like time, tick, viewportwidth...
// https://github.com/regl-project/regl/blob/gh-pages/API.md#context

regl.frame((context) => {

	// props
	// like react props, you pass in "arguments" for each render time
	var props = {
		color: [0.2, 0.3, 1.0, 1.0]
	}
	drawTriangle(props);

	// this
	// pass into the regl instance
})