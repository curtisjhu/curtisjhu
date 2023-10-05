// sin(x)
// cos(x)
// e^x

// out of the box, but it goes straight to the answer
// https://observablehq.com/@harrystevens/introducing-d3-regression
import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.1/dist/tweakpane.min.js";

const PARAMS = {
    x: "sin(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)",
    y: "cos(t) * (exp(cos(t)) - 2 cos(4t) - sin(t/12)^5)",
    domain: { x: -4, y: 4 },
    range: { x: -3, y: 4 },
    tDomain: { x: -10 * Math.PI, y: 10 * Math.PI },
    sample: false,
};
const pane = new Pane({
    title: "2d parametric equations",
});

pane.addBinding(PARAMS, "x").on("change", (v) => drawPlot());
pane.addBinding(PARAMS, "y").on("change", (v) => drawPlot());
pane.addBinding(PARAMS, "domain", {
    format: (e) => e.toFixed(0),
}).on("change", (v) => {
    drawPlot();
});
pane.addBinding(PARAMS, "range", {
    format: (e) => e.toFixed(0),
}).on("change", (v) => {
    drawPlot();
});
pane.addBinding(PARAMS, "tDomain").on("change", (v) => drawPlot());

let contentsBounds = document.body.getBoundingClientRect();
let width = 800;
let height = 500;
let ratio = contentsBounds.width / width;
width *= ratio;
height *= ratio;

function drawPlot() {
    functionPlot({
        target: "#app",
        width,
        height,
        xAxis: { domain: [PARAMS.domain.x, PARAMS.domain.y] },
        yAxis: { domain: [PARAMS.range.x, PARAMS.range.y] },
        grid: true,
        data: [
            {
                x: PARAMS.x,
                y: PARAMS.y,
                range: [PARAMS.tDomain.x, PARAMS.tDomain.y],
                fnType: "parametric",
                graphType: "polyline",
            },
        ],
    });
}

drawPlot();
