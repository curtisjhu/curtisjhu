// sin(x)
// cos(x)
// e^x

// out of the box, but it goes straight to the answer
// https://observablehq.com/@harrystevens/introducing-d3-regression
import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js';

const possibleEqs = ["1-x-x^2+x^3", "sin(x)", "cos(x)", "e^x"]
const PARAMS = {
  equation: possibleEqs[0],
  speed: 40
}
const pane = new Pane({
	title: "MLP learns Taylor series"
});
pane.registerPlugin(TweakpaneLatexPlugin);
pane.addBlade({
  view: "latex",
  content: `
This is trying to find the coefficients to the Taylor series up to the fourth power within [-2, 2] using simple backpropagation.
We need the data sampled to be enough such that it'll converge.
  `
})

// pane.addBinding(PARAMS, 'speed', {
//   min: 100,
//   max: 10000,
//   interval: 100,
// });
pane.addBinding(PARAMS, "equation")
  .on("change", function() {
    options.data[0].fn = PARAMS.equation;
    options.data[1].scope = {
      a: Math.random(),
      b: Math.random(),
      c: Math.random(),
      d: Math.random(),
      e: Math.random(),
      f: Math.random(),
      g: Math.random(),
      h: Math.random(),
    }
    startProcess();
  });

const options = {
  target: "#app",
  width: window.innerWidth,
  height: window.innerHeight,
  xAxis: { domain: [-3, 3] },
  yAxis: { domain: [-2, 2] },
  grid: true,
  data: [
    {
      fn: PARAMS.equation,
    },
    {
      scope: {
        a: Math.random(),
        b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random(),
      },
      fn: "a + b*x + c*x^2 + d*x^3 + e*x^4",
    }
  ]
}

functionPlot(options);

window.addEventListener("resize", function (e){
  options.width = e.target.innerWidth;
  options.height = e.target.innerHeight;
})

var lastError = 100000000;
const partials = {
  a: "1",
  b: "x",
  c: "x^2",
  d: "x^3",
  e: "x^4",
  f: "x^5",
  g: "x^6",
  h: "x^7",
}


var start = -2, end = 2;
function startProcess() {

let id = setInterval(() => {
  var eq = options.data[1];
  var eqc = options.data[0];

  var error = 0;

  for (var v = start; v < end; v += (end - start)/20 ) {
    eq.scope = { ...eq.scope, x: v };
    error += math.evaluate(`0.5 * (${eq.fn} - (${eqc.fn}))^2`, eq.scope);
  }

  console.log("MSE: ", error);

  // dE/dy * dy/dc...
  var delta = 0.01;
  for (var v = start; v < end; v += (end - start)/20 ) {
    eq.scope = { ...eq.scope, x: v };
    var dE_dy = math.evaluate(`(${eq.fn} - (${eqc.fn}))`, eq.scope);
    for (let p of Object.keys(partials)) {
        var sec = math.evaluate(partials[p], eq.scope);
        eq.scope[p] -= delta * dE_dy * sec;
    }
  }


  if (error < 0.0001) {
    console.log("Minima reached");
    clearInterval(id);
  }

  functionPlot(options);
}, PARAMS.speed)


}

startProcess();
