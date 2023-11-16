import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import "https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js";
import "https://unpkg.com/tweakpane-latex/dist/tweakpane-latex.js";

const pane = new Tweakpane.Pane({
    title: "Central Limit Theorem",
});

pane.registerPlugin(TweakpaneLatexPlugin)
pane.addBlade({
    view: "latex",
    content:
`
# Central Limit Theorem 

Say you have a random variable $X_i$.

Then the sum of this random variable follows a normal distribution as $n \\rightarrow \\infty$
$$ Normal \\sim \\sum_{i = 0}^{n} X_i $$

## References
This was created as part of a short finance lesson taught for <a href="https://berkeley.learningu.org/">Splash@Berkeley</a> with my friend <a href="linkedin.com/in/vedant-m-jhawar">Vedant Jhawar</a>.
`,
    markdown: true
})

const searchParams = new URLSearchParams(window.location.search);

const PARAMS = {
    randomVariable: searchParams.get("randomVariable") || "uniform",
    numberofRV: searchParams.get("numberofRV") || 100,
    maxPoints: 1000,
    speed:  10,
    batches: 5
};

const generators = {
    "gaussian": {
        mu: 1,
        var: 0.3,
        gen: d3.randomNormal(1, 1),
    },
    "uniform": {
        mu: 0.5,
        var: 0.0833,
        gen: d3.randomLcg(1),
    },
    "exponential": {
        mu: 3,
        var: 1/3,
        gen: d3.randomExponential(1/3),
    },
    "bernoulli": {
        mu: 0.3,
        var: 0.3*0.7, // p(1-p)
        gen: d3.randomBernoulli(0.3),
    },
    "geometric": {
        mu: 3,
        var: 3,
        gen: d3.randomGeometric(0.1),
    },
    "binomial": {
        mu: 30,
        var: 100*0.3*0.7,
        gen: d3.randomBinomial(100, 0.3),
    },
    "gamma": {
        mu: 3,
        var: 3,
        gen: d3.randomGamma(2, 1),
    },
}


var points = [];
var rng = generators[PARAMS["randomVariable"]].gen;

function createPoints() {
    if (points.length > PARAMS["maxPoints"]){
        return;
    }

    for (var i = 0; i < PARAMS["batches"]; i++) {
        var pos = 0;
        for (var k = 0; k < PARAMS["numberofRV"]; k++) pos += rng();

        var x = Math.round(pos);
        points[x] = points[x] ? points[x] + 1 : 1;
    }
}

createPoints();

pane.addInput(PARAMS, "randomVariable", {
    options: {
        "gaussian": "gaussian",
        "uniform": "uniform",
        "exponential": "exponential",
        "bernoulli": "bernoulli",
        "geometric": "geometric",
        "binomial": "binomial",
        "gamma": "gamma",
    }
}).on("change", (ev) => {
    window.location.search = "?randomVariable="+ev.value;
})
pane.addInput(PARAMS, "numberofRV", {
    max: 10000,
    min: 1
}).on("change", (ev) => {
    window.location.search = "?numberofRV="+ev.value
})
// pane.addInput(PARAMS, "speed", {
//     max: 500,
//     min: 1
// }).on("change", (ev) => {
//     window.location.search = "?speed="+ev.value
// })
// pane.addInput(PARAMS, "maxPoints", {
//     max: 50000,
//     min: 10
// })


// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 60;
const marginRight = 60;
const marginBottom = 60;
const marginLeft = 60;

// Declare the x (horizontal position) scale.
var max = generators[PARAMS["randomVariable"]].mu * PARAMS["numberofRV"] + PARAMS["numberofRV"]*generators[PARAMS["randomVariable"]].var;
const x = d3.scaleLinear()
    .domain([0, max])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 50])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    // .attr("style", "max-width: 100%; height: auto;");

setInterval(() => {
    createPoints();

    rectangles
    .selectAll()
    .data(points)
    .join("rect")
        .attr("x", (d, i) => x(i) + 1)
        .attr("width", (d, i) => x(i+1) - x(i))
        .attr("y", (d) => y(d))
        .attr("height", (d) => y(0) - y(d));
}, PARAMS["speed"]*10)

// Add a rect for each bin.
const rectangles = svg.append("g")
    .attr("fill", "steelblue");

// Add the x-axis and label.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
    .call((g) => g.append("text")
        .attr("x", width/2)
        .attr("y", marginBottom)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("x"));

// Add the y-axis and label, and remove the domain line.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) => g.append("text")
        .attr("x", -marginLeft*3/4)
        .attr("y", marginTop-20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Frequency"));

// Append the SVG element.
document.getElementById("app").append(svg.node());

