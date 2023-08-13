const regl = require("regl")();
const { Pane } = require("tweakpane");
const { create, all } = require("mathjs");

const PARAMS = {
  "f(x)=": 'x*x',
};

const pane = new Pane({
	title: 'Graphing',
	expanded: true,
});
pane.addBinding(PARAMS, 'f(x)=');


const math = create(all);
const node = math.parse(PARAMS["f(x)="]); // into node tree
const code = node.compile(); // compile node tree

var domain = [-1, 1];
var range = [-1, 1];

const num = 100000;
var coords = [];
for (var i = 0; i < num; i++) {
	var x = (domain[1]-domain[0])*(i/num) + domain[0];
	var y = code.evaluate({ x: x});
	coords[i] = [x, (range[1]-range[0])*y + range[0]]
}


const draw = regl({
    uniforms: {
		background: [1, 1, 1],
		axisColor: [0, 0, 0],
		functionColor: [1, 0, 0],
		lineWidth: 0.008,
		func: regl.prop("func")
    },
    attributes: {
        position: coords,
    },
    count: coords.length,
	primitive: "line strip",
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
	uniform vec3 background;

    void main() {

		vec3 col = background;
      	gl_FragColor = vec4(col, 1);
    }`,

});

regl.frame(({ time }) => {
    draw();
});
