const regl = require("regl")();

var domain = [-1, 1];
var range = [-1, 1];

function f(x, y) {
	return x*x - y*y;
}

var side = 100;
var coords = [];
for (var i=0;i<side ;i++) {
	for (var j=0;j<side ;j++) {
		var x = (domain[1]-domain[0])*(i/side) + domain[0];
		var y = (range[1]-range[0])*(j/side) + range[0];
		coords.push([x, f(x, y), y]);
	}
}


const draw = regl({
    uniforms: {
        // iTime: (ctx) => ctx.time,
    },
    attributes: {
        position: coords,
    },
    count: coords.length,
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
    void main() {

		vec3 col = 0.5 + 0.5*cos(0.4+uv.xyx+vec3(0,2,4));
      	gl_FragColor = vec4(col, 1);
    }`,

});

regl.frame(({ time }) => {
    draw({});
});
