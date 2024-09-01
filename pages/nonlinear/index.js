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
exports.PARAMS = PARAMS;

const { rungeKutta4 } = require("./utils");

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