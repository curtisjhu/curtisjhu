const regl = require("regl")();

const { Pane } = require("tweakpane")
const TweakpaneLatex = require("tweakpane-latex")
const camera = require("regl-camera")(regl, {
  theta: -Math.PI / 6
})


const PARAMS = {
  respawn: 5, // smaller is faster respawns
  n: 1e4,
  groups: 60, // smaller is bigger chucks
  speed: 2,
  beta: 0,
  k: 0,
  mu: 1,
  amplitude: 4
}

function f_x(x, y, z) {
	return y;
}

function f_y(x, y, z) {
	return PARAMS.mu * (1 - x*x) * y - x + PARAMS.beta * x*x*x - PARAMS.k*z;
}

function f_z(x, y, z) {
	return y - z;
}

const h = 0.05;
function rungeKutta4(point) {
	var x = point[0];
	var y = point[1];
	var z = point[2];

	var k_1x = f_x(x, y, z);
	var k_1y = f_y(x, y, z);
	var k_1z = f_z(x, y, z);

	var k_2x = f_x(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);
	var k_2y = f_y(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);
	var k_2z = f_z(x + 0.5 * h * k_1x, y + 0.5 * h * k_1y, z + 0.5 * h * k_1z);

	var k_3x = f_x(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);
	var k_3y = f_y(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);
	var k_3z = f_z(x + 0.5 * h * k_2x, y + 0.5 * h * k_2y, z + 0.5 * h * k_2z);

	var k_4x = f_x(x + h * k_3x, y + h * k_3y, z + h * k_3z);
	var k_4y = f_y(x + h * k_3x, y + h * k_3y, z + h * k_3z);
	var k_4z = f_z(x + h * k_3x, y + h * k_3y, z + h * k_3z);

	x = x + (h/6) * (k_1x + 2*k_2x + 2*k_3x + k_4x);
	y = y + (h/6) * (k_1y + 2*k_2y + 2*k_3y + k_4y);
	z = z + (h/6) * (k_1z + 2*k_2z + 2*k_3z + k_4z);

	return [x, y, z]
};

const pane = new Pane({
    title: "Nonlinear Systems"
})
pane.registerPlugin(TweakpaneLatex);
pane.addBlade({
  view: "latex",
  content: `
# Van der Pol Oscillator

A while back, I met someone named Jacob Martin presenting all this Strogatz "nonlinear dynamics" stuff at a small undergraduate conference.
He gave me his animations, but I didn't really do anything with it for a while. Here's my reimplementation of his work but with computer graphics.

Using Runge Kutta Method to approximate the path of the differential equations:

$$ x' = y $$ 
$$ y' = \\mu * (1 - x^2) * y - x + \\beta * x^2 - k*z $$
$$ z' = y - z $$
`, 
  border: false,
  markdown: true,
});
pane.addBinding(PARAMS, "mu", {
  min: -5,
  max: 5
})
pane.addBinding(PARAMS, "beta", {
  min: -5,
  max: 5
})
pane.addBinding(PARAMS, "k", {
  min: -5,
  max: 5
})

pane.addBinding(PARAMS, "speed", {
  min: 1,
  max: 4,
  step: 1
})
pane.addBinding(PARAMS, "groups", {
  min: 10,
  max: 140,
  step: 1
})
pane.addBinding(PARAMS, "respawn", {
  min: 1,
  max: 50,
  step: 1
});




var pointBuffer = Array(PARAMS.n).fill().map(function () {
  return [
    // pos
    Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude,
    Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude,
    Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude,
  ]
})


const drawParticles = regl({
  vert: `
  precision mediump float;
  attribute vec3 position;
  attribute vec4 color;
  uniform mat4 view, projection;
  // varying vec4 fragColor;
  void main() {
    gl_PointSize = 5.0;
    gl_Position = projection * view * vec4(position, 1);
    // fragColor = color;
  }`,
  frag: `
  precision lowp float;
  varying vec4 fragColor;
  void main() {

    // makes it an actual circle
    if (length(gl_PointCoord.xy - 0.5) > 0.5) {
      discard;
    }
    
    gl_FragColor = vec4(0.8, 0.7, 0.6, 0.5);
  }`,

  attributes: {
    position: regl.prop("positions") 
  },
  uniforms: {},
  count: regl.prop("count"),
  primitive: 'points',
  blend: {
    enable: true,
    func: {
      srcRGB: 'src alpha',
      srcAlpha: 1,
      dstRGB: (context, props) => props.invert ? 'one minus src alpha' : 1,
      dstAlpha: 1
    },
    equation: {
      rgb: (context, props) => props.invert ? 'reverse subtract' : 'add',
      alpha: 'add'
    }
  },
})

var updateGroupIndex = 0;
regl.frame(({ tick }) => {
  if (tick % PARAMS.speed != 0) return;
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  });

  updateGroupIndex = Math.floor(tick/PARAMS.respawn) % PARAMS.groups;
  pointBuffer = pointBuffer.map((el, i) => {
      if (updateGroupIndex == i % PARAMS.groups)
        return [
          Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude,
          Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude,
          Math.random() * 2*PARAMS.amplitude - PARAMS.amplitude
        ]
      return rungeKutta4(el)
  });

  camera((state) => {
    drawParticles({
      positions: pointBuffer,
      count: pointBuffer.length
    });
  });
})