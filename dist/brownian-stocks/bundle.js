import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import "https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js";
import "https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js";

const pane = new Tweakpane.Pane({
    title: "Brownian Motion in Stocks",
})
pane.registerPlugin(TweakpaneLatexPlugin);

const searchParams = new URLSearchParams(window.location.search);
const PARAMS = {
    numberLines: searchParams.get("numberLines") || 80,
    mu: searchParams.get("mu") || 0.3,
    var: searchParams.get("var") || 4,
    delta: 1,
    pause: false,
    speed: searchParams.get("speed") || 20,
    stopAfter: 1200
}

pane.addInput(PARAMS, "numberLines", {
    step: 1,
    min: 1, 
    max: 200
}).on("change", (ev) => {
    window.location.search = "?numberLines="+ev.value
})
pane.addInput(PARAMS, "mu", {
    min: -2,
    max: 2
}).on("change", (ev) => {
    window.location.search = "?mu="+ev.value
})
pane.addInput(PARAMS, "var", {
    min: 1,
    max: 10
}).on("change", (ev) => {
    window.location.search = "?var="+ev.value
})
pane.addInput(PARAMS, "pause")
pane.addInput(PARAMS, "speed").on("change", (ev) => {
    window.location.search = "?speed="+ev.value
})

const info = pane.addFolder({
    title: "Information",
    expanded: false
})
info.addBlade({
    view: "latex",
    content:
`
# Simpler Brownian Motion in Stocks

Let $X_i$ be a coin flip at time step $i$
Let's define $p = \\frac{1}{2} (1 + \\frac{\\mu}{\\sigma} \\sqrt{\\Delta})$

$$ X_i = \\begin{cases} 1 \\quad \\text{if } p \\\\ -1 \\quad \\text{if } 1- p  \\end{cases} $$

Hence, every time step changes by $X_i \\sigma \\sqrt{\\Delta}$

$$ X(n \\Delta) = X(0) + \\sigma \\sqrt{\\Delta} \\sum X_i $$
$$ Normal \\sim X(n \\Delta) - X(0) = \\sigma \\sqrt{\\Delta} \\sum X_i $$

As the time steps increase, the result is a normal distribution!
$Normal(\\mu \\cdot n \\Delta, \\quad \\sigma^2 n \\Delta (1 -(2p -1)^2)) $

## References
This was created as part of a short finance lesson taught for <a href="https://berkeley.learningu.org/">Splash@Berkeley</a> with my friend <a href="linkedin.com/in/vedant-m-jhawar">Vedant Jhawar</a>.
`,
    markdown: true
})

const colorList = [
  "rgb(66,133,244)",
  "rgb(219,68,55)",
  "rgb(244,180,0)",
  "rgb(14,157,88)",
  "rgb(88, 81, 216)",
  "rgb(192, 53, 132)",
  "rgb(255, 48, 108)",
  "rgb(88, 81, 216)",
  "rgb(255, 220, 128)",
  "rgb(137, 211, 223)",
  "rgb(99, 193, 160)",
  "rgb(255, 153, 0)",
  "rgb(0, 0, 0)",
  "rgb(248, 0, 0)"
]


var initialStockPrice = 500;
var points = d3.range(PARAMS["numberLines"]).map(i => [{ x: 0, y: initialStockPrice}]) 
var p = 0.5 * (1 + PARAMS.mu * Math.sqrt(PARAMS.delta)/PARAMS.var);
var rng = d3.randomBernoulli(p);


function createPoints() {
    for (var i = 0; i < PARAMS["numberLines"]; i++) {
        if (!points[i]) {
            points[i] = [{x: 0, y: initialStockPrice}];
        }
        var lastPoint = points[i][points[i].length-1];

        points[i].push({
            x: points[i].length,
            y: lastPoint.y + (rng() == 1 ? 1 : -1) * PARAMS.var * Math.sqrt(PARAMS.delta)
        })
    }
}


createPoints();

// Declare the chart dimensions and margins.
const width = 928;
const height = 500;
const marginTop = 100;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;


// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


// Add the x-axis.
const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(g => g.append("text")
        .attr("x", width/2)
        .attr("y", marginBottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Time Interval")
    )


// Add the y-axis, remove the domain line, add grid lines and a label.
const yAxis = svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));

// Append a path for the line.

var lines = []

function createLines() {
    for (var i = 0; i < PARAMS["numberLines"]; i++) {
        lines.push(svg.append("path")
            .attr("fill", "none")
            .style("opacity", .2)
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round")
            .attr("stroke-width", 1.5)
            .attr("stroke", colorList[i % colorList.length]));
    }
}
createLines();


setInterval(() => {
    if (PARAMS["pause"] || points[0].length > PARAMS.stopAfter) {
        return;
    }

    createPoints();

    // Declare the x (horizontal position) scale.
    const x = d3.scaleLinear()
        .domain([0, points[0].length])
        .range([marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    var mmax = d3.max(points, d => d3.max(d, (k) => k.y));
    const y = d3.scaleLinear()
        .domain([0, mmax])
        .range([height - marginBottom, marginTop]);

    xAxis.call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    yAxis.call(d3.axisLeft(y).ticks(height / 50))

    for (var i = 0; i < PARAMS["numberLines"]; i++) {
        if (!points[i]) break;

        lines[i]
            .datum(points[i])
            .attr("d", d3.line().x((d) => x(d.x)).y((d) => y(d.y)));
    }

}, 10)


document.getElementById("app").append(svg.node());