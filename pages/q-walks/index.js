const regl = require("regl")();
const camera = require("regl-camera")(regl, {
    distance: 4,
    center: [0, 0, 0],
    theta: Math.PI * 0.5,
    phi: 0.0,
});
var PF = require('pathfinding');

const { Pane } = require("tweakpane");
const TweakpaneLatexPlugin = require("tweakpane-latex");

const pane = new Pane({
    title: "Quantum Walks",
})
pane.registerPlugin(TweakpaneLatexPlugin);

const info = pane.addFolder({
    title: "Classical Walks Description",
    expanded: false
})
info.addBlade({
    view: "latex",
    content:
`
# Classical Walks 

Let's define a finite group of nodes as:
$$ G=(V,E) \\quad \\text{Graph} $$
$$ V=\\{v_1, v_2,...,v_n\\} \\quad \\text{Vertices} $$
$$ E \\in V \\otimes V \\quad \\text{Edges} $$
$$ M \\in V \\quad \\text{Halting Nodes}$$
$$ A_{ij} = \\begin{cases} 1 & (v_i, v_j) \\in E \\\\ 0 & otherwise \\end{cases} \\quad \\text{Adjacency Matrix}$$

Let $p(t) = [p_1, p_2, ..., p_n]^T$ be the probability of being at that location of all vertices.

## Transition matrix
$$ p(t+1) = T p(t) $$

What is the probability that it returns to the starting node as $n \\rightarrow \\infty$?

More generally, what is the probability that it gets stuck at $M$ (Halting nodes) as $n \\rightarrow \\infty$

Proof 
Where $M$ are nodes that it halts at.

Converges to $< \\epsilon$ in O(N)!

<img src="https://graphics.funnyscar.com/quantum-walks/converging-classical.png" width="180"/>


## References
This was based off the following <a href="https://bucket.funnyscar.com/coursework/QCT_Final_Project_Scharnhorst_Thilo.pdf">paper on quantum walks</a> by Thilo Scharnhorst (Berkeley Physics PhD Candidate).
`,
    markdown: true
})

const quantum = pane.addFolder({
    title: "Quantum Walks Description",
    expanded: false
})
quantum.addBlade({
    view: "latex",
    content:
`
# Quantum Walks

The probability that it reaches the halting node varies according to the time step!

<img src="https://graphics.funnyscar.com/quantum-walks/non-converging-quantum.png" width="180" />

## References
This was based off the following <a href="https://bucket.funnyscar.com/coursework/QCT_Final_Project_Scharnhorst_Thilo.pdf">paper on quantum walks</a> by Thilo Scharnhorst (Berkeley Physics PhD Candidate).
`,
    markdown: true
})




const PARAMS = {
    distribution: "gaussian",
    spacing: 50 
};

var grid = new PF.Grid(Math.floor(window.innerWidth/PARAMS.spacing), Math.floor(window.innerHeight/PARAMS.spacing)); 

function createPoints() {
    var points = []
    for (var i = 0; i < grid.width; i++) {
        for (var j = 0; j < grid.height; j++) {
            points.push({
                x: -viewportRatio[0] + i * 2 * viewportRatio[0] / grid.width,
                y: -viewportRatio[1] + j * 2 * viewportRatio[1] / grid.height,
                g: 0.0
            })
        }
    }
    return points;
}

function getIndex(i, j){
    return j + grid.width * i;
}

var viewportRatio = [1, 1, 0];
var points = createPoints();

// set one as 1.
points[getIndex(Math.round(grid.width/2), Math.round(grid.height/2))].g = 1;
grid.setWalkableAt(Math.round(grid.width/2)-1, Math.round(grid.height/2), false)

function updatePoints() {
    var copy = points.map((x) => ({...x, g: 0}));

    for (var i = 0; i < grid.width; i++) {
        for (var j = 0; j < grid.height; j++) {
            var node = grid.getNodeAt(i, j);
            if (!node.walkable) {
                copy[getIndex(node.x, node.y)].g = points[getIndex(node.x, node.y)].g;
                break;
            }

            var neighbors = grid.getNeighbors(node, 2);
            var val = points[getIndex(node.x, node.y)].g / neighbors.length;

            for (var k = 0; k < neighbors.length; k++) {
                var n = neighbors[k];
                copy[getIndex(n.x, n.y)].g += val;
            }
        }
    }
    points = [...copy];
}

window.addEventListener("resize", function() {
    grid = new PF.Grid(Math.floor(window.innerWidth/PARAMS.spacing), Math.floor(window.innerHeight/PARAMS.spacing)); 
})

const drawPoints = regl({
    uniforms: {
        pointWidth: 20,
        windowRatio: (prop) => {
            if (prop.viewportWidth > prop.viewportHeight) {
                viewportRatio = [prop.viewportHeight / prop.viewportWidth, 1, 0];
                return viewportRatio;
            }

            viewportRatio = [1, prop.viewportWidth / prop.viewportHeight, 0]
            return viewportRatio;
        }
    },
    attributes: {
        position: regl.prop("positions"),
        color: regl.prop("colors"),
    },
    count: regl.prop("numPoints"),
    primitive: "points",
    vert: `
	precision mediump float;
	attribute vec3 position;
	attribute vec3 color;
	varying vec3 fragColor;
	uniform float pointWidth;
    uniform vec3 windowRatio;

	void main() {
		fragColor = color;
		gl_PointSize = pointWidth;
		gl_Position = vec4(position * windowRatio, 1);
	}
	`,
    frag: `
	precision mediump float;
	varying vec3 fragColor;
	uniform float pointWidth;

	void main() {
		gl_FragColor = vec4(fragColor, 1);
	}
	`,
});

regl.frame((context) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });

    if (context.tick % 20 == 0) {
        updatePoints();
    }

    drawPoints({
        positions: points.map(d => [d.x, d.y, 0]),
        colors: points.map(d => [d.g, d.g, d.g]),
        numPoints: points.length
    })
});
