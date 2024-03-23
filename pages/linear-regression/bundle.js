// sin(x)
// cos(x)
// e^x

// out of the box, but it goes straight to the answer
// https://observablehq.com/@harrystevens/introducing-d3-regression
import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js';
import * as TweakpaneLatexPlugin from "https://unpkg.com/tweakpane-latex@0.1.2/dist/tweakpane-latex.js"

const PARAMS = {
	equation: "e^x",
  time: 0,
  terms: 1
}
const pane = new Pane({
	title: "MLP learns Linear Data"
});
console.log(TweakpaneLatexPlugin)
pane.registerPlugin(TweakpaneLatexPlugin);
console.log(pane)
pane.addBlade({
  view: "latex",
  content: `
# Hello
`,
  markdown: true
});

pane.addBinding(PARAMS, 'time', {
  readonly: true,
  interval: 1000,
});


let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

functionPlot({
  target: "#app",
  width,
  height,
  yAxis: { domain: [-2, 2] },
  grid: true,
  data: [
    {
      fn: "",
    },
    {
      fn: "x",
    }
  ]
});


