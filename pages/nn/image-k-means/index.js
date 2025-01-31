const regl = require("regl")();
const p5 = require("../../p5.js");
const d3 = require("../../d3.min.js");
const TweakpaneLatexPlugin = require('../../tweakpane-latex-1.4.min.js');

const camera = require("regl-camera")(regl, {
    distance: 800,
    center: [255/2, 255/2, 255/2],
    theta: Math.PI * 0.5,
    phi: 0,
});

const { Pane } = require("tweakpane");

const pane = new Pane({
    title: "Image Segmentation",
});
pane.registerPlugin(TweakpaneLatexPlugin);
pane.addBlade({
	view: "latex",
	markdown: true,
	content: `This is (rgb) vector quantization with k-means as found in *Deep Learning* (Biship & Bishop 2024).
	Note: this may be slightly slow as it is GPU intensive.`,
  });

const PARAMS = {
    image: "bridge.jpg",
	clusters: 4
};

pane.addBinding(PARAMS, "image", {
	options: {
		"bridge": "./bridge.jpg",
		"dylan": "./dylan.jpg",
		"abbey road": "./abbey-road.jpg",
		"mars rover": "./mars-rover.jpg",
		"last supper": "./last-supper.jpg",
	}
}).on("change", (ev) => {
	instance.setup();
});
pane.addBinding(PARAMS, "clusters", {
	min: 1,
	max: 18,
	step: 1
})
const btn = pane.addButton({
	title: 'increment',
	label: 'step through',
  });

var colors = [];
var points = [];
var centroids = [];

// DISPLAY IMAGE
const canvas = document.createElement("div");
canvas.style.width = "400px";
canvas.style.height = "225px";
canvas.style.position = "absolute";
var sketch = function(p) {
	function generatePointsFromImage(img, numClusters) {
		points = [];
		colors = [];
		img.loadPixels();

		for (let i = 0; i < img.pixels.length; i += 4) {
			points.push(img.pixels.slice(i, i + 3));
			colors.push(Array.from(img.pixels.slice(i, i + 3), (v) => v / 255));
		}

		for (let i = 0; i < numClusters; i++) {
			centroids.push([Math.random() * 255, Math.random() * 255, Math.random() * 255]);
		}
	}

	p.setup = function() {
		p.loadImage(PARAMS["image"], function(img) {
			p.createCanvas(300, 200);
			p.image(img, 0, 0, 300, 200, 0, 0, img.width, img.height, p.COVER);

			generatePointsFromImage(img, PARAMS["clusters"]);

			btn.on('click', () => {
				kmeans();

				img.loadPixels();
				console.log(img.pixels)
				for (let i = 0, j = 0; i < img.pixels.length; i += 4, j++) {
					img.pixels[i] = colors[j][0]*255;
					img.pixels[i+1] = colors[j][1]*255;
					img.pixels[i+2] = colors[j][2]*255;
				}
				img.updatePixels();
				p.image(img, 0, 0, 300, 200, 0, 0, img.width, img.height, p.COVER);
			});
		});


	}

}
const instance = new p5(sketch, canvas);

document.body.appendChild(canvas);


const drawPoints = regl({
    uniforms: {
        pointWidth: 2,
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
	uniform mat4 projection, view;

	void main() {
		fragColor = color;
		gl_PointSize = pointWidth;
		gl_Position = projection * view * vec4(position, 1);
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

regl.frame((context, tick) => {
    regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
    });




    camera((state) => {
        drawPoints({
            positions: points,
            colors: colors,
            numPoints: points.length
        })
    });
});

function kmeans() {
	// BEGIN KMEANS ALGORITHM
	// group the points
	var groups = {};
	for (var j = 0; j < centroids.length; j++) {
		groups[j] = []
	}
	var pointsTable = {};

	// find group for every point
	for (var i = 0; i < points.length; i++) {
		var minDist = 1e9, group = 0;

		// find closest distanced centroid
		for (var j = 0; j < centroids.length; j++) {
			var r =   Math.pow((points[i][0] - centroids[j][0]), 2) 
					+ Math.pow((points[i][1] - centroids[j][1]), 2)
					+ Math.pow((points[i][2] - centroids[j][2]), 2);
			if (r < minDist) {
				minDist = r;
				group = j; // that indexed centroid is the group
			}
		}

		// assign to a group
		// also give that point a the centroid's color
		groups[group].push(points[i]);
		pointsTable[i] = group; // probably not memory efficient
	}

	// calculate new centroid locations (avg)
	for (var j = 0; j < centroids.length; j++) {
		var L = groups[j].length;  
		centroids[j][0] = groups[j].reduce((a, b) => a + b[0], 0) / L; 
		centroids[j][1] = groups[j].reduce((a, b) => a + b[1], 0) / L; 
		centroids[j][2] = groups[j].reduce((a, b) => a + b[2], 0) / L; 
	}

	for (var i = 0; i < points.length; i++) {
		colors[i] = centroids[pointsTable[i]].map((v) => v / 255);
	}
}
