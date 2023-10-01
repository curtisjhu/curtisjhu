const regl = require("regl")();
const d3 = require("./d3.min.js");
const { Pane } = require("tweakpane")
const infoDump = require("tweakpane-plugin-infodump")

const pane = new Pane({
  title: "K-means algorithm"
})

pane.registerPlugin(infoDump);
pane.addBlade({
  view: "infodump",
  content: `
  This k-means algorithm was written from scratch in javascript.
  Each of the k centroids (in this case k = numberOfPoints/groups) are randomly assigned to a point. 
  Then we loop the following.
  The first step assigns each sample to its nearest centroid.
  The second step creates new centroids by taking the mean value of all of the samples assigned to each previous centroid. 
  The difference between the old and the new centroids are computed and the algorithm repeats these last two steps until this value is less than a threshold.`,
  border: false,
  markdown: false,
});

const url = new URLSearchParams(window.location.search);
const maxSpeed = 4;
const settings = {
    n: parseInt(url.get("n")) || 100,
    groups: parseInt(url.get("groups")) || 20,
    speed: 0.8 * maxSpeed,
    std: 0.4
};
pane.addInput(settings, "n", {
  step: 14,
  min: 1,
  max: 200
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?n='+ev.value);
  window.location.reload();
});
pane.addInput(settings, "groups", {
  step: 1,
  min: settings.n/14,
  max: settings.n
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?groups='+ev.value);
  window.location.reload();
});
pane.addInput(settings, "speed", {
  min: 0,
  max: maxSpeed
});

const btn = pane.addButton({
  title: 'refresh',
});
btn.on('click', () => {
  window.location.reload();
});



const colorList = [
  [66/255,133/255,244/255],
  [219/255,68/255,55/255],
  [244/255,180/255,0],
  [14/255,157/255,88/255],
  [88/255, 81/255, 216/255],
  [192/255, 53/255, 132/255],
  [255/255, 48/255, 108/255],
  [88/255, 81/255, 216/255],
  [255/255, 220/255, 128/255],
  [137/255, 211/255, 223/255],
  [99/255, 193/255, 160/255],
  [255/255, 153/255, 0],
  [0, 0, 0],
  [248/255, 0, 0]
]

// GEN POINTS
var xy = [];
var cols = [];
var centroidsXY = [];
var centroidsCols = [];

function genPoints() {
    var rng = d3.randomNormal(0, settings.std);
    for (var i = 0; i < settings.n / settings.groups; i++) {
      // not perfectly uniform in entire area.
      // Also not exactly N, but I don't care about the details.
      var x = Math.random() *2 - 1,
          y = Math.random() *2 - 1;
      for (var j = 0; j < settings.groups; j++) {

        // weird implementation.
        var l = rng();
        var ang = Math.random()*2*Math.PI;
        var nx = l * Math.cos(ang);
        var ny = l * Math.sin(ang);


        xy.push([nx + x, ny + y]);
        cols.push(colorList[i]);
      }

      centroidsXY.push(xy[i]);
      centroidsCols.push(colorList[i]);
    }
}

const drawPoints = regl({
    depth: {enable: false},
    blend: {
      enable: true,
      func: {srcRGB: 'src alpha', srcAlpha: 1, dstRGB: 1, dstAlpha: 1},
      equation: {rgb: 'reverse subtract', alpha: 'add'}
    },
    uniforms: {
        size: (ctx, props) => props.size,
        alpha: regl.prop("alpha"),
        aspect: ctx => {
          var w = ctx.viewportWidth;
          var h = ctx.viewportHeight;
          return w / h > 1 ? [h / w, 1] : [1, w / h];
        },
    },
    attributes: {
        xy: regl.prop("xy"),
        color: regl.prop("color"),
    },
    primitive: "points",
    count: (ctx, props) => {
      return props.xy.length
    },
    vert: `
  precision mediump float;
  attribute vec2 xy;
  attribute vec3 color;

  uniform vec2 aspect;
  uniform float size;

  varying vec3 col;

  void main() {
    col = color;
    gl_Position = vec4(xy * aspect, 0, 1);
    gl_PointSize = size;
  }`,
    frag: `
  precision mediump float;
  uniform float size;
  uniform float alpha;
  varying vec3 col;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv) * size * 2.0;
    gl_FragColor = vec4(col, alpha * smoothstep(size, size - 2.0, r));
  }
  `,
});

window.addEventListener("resize", function(e) {
  iteration = 1;
  previousCentroidsXY = null;
})

let iteration = 1;
genPoints();
let previousCentroidsXY = null;
let lastFrame = 0;


regl.frame((context) => {
  if (context.time - lastFrame < maxSpeed - settings.speed) {
    return;
  }

    // BEGIN KMEANS ALGORITHM
    // group the points
    var groups = [];
    for (var j = 0; j < centroidsXY.length; j++) {
      groups[j] = []
    }

    // find group for every point
    for (var i = 0; i < xy.length; i++) {
      var minDist = 1e9, group = 0;

      // find closest distanced centroid
      for (var j = 0; j < centroidsXY.length; j++) {
        var r = Math.pow((xy[i][0] - centroidsXY[j][0]), 2) + Math.pow((xy[i][1] - centroidsXY[j][1]), 2);
        if (r < minDist) {
          minDist = r;
          group = j; // that indexed centroid is the group
        }
      }

      // assign to a group
      // also give that point a the centroid's color
      groups[group].push(xy[i]);
      cols[i] = colorList[group];
    }

    // calculate new centroid locations (avg)
    for (var j = 0; j < centroidsXY.length; j++) {

      var tot = [0, 0];
      for (var k = 0; k < groups[j].length; k++) {
        tot[0] += groups[j][k][0];
        tot[1] += groups[j][k][1];
      }

      centroidsXY[j][0] = tot[0] / groups[j].length; 
      centroidsXY[j][1] = tot[1] / groups[j].length; 
    }


    regl.clear({
        color: [1, 1, 1, 1],
    });


    drawPoints({
        xy: xy,
        color: cols,
        size: 10,
        alpha: 0.6,
    });

    drawPoints({
      xy: centroidsXY,
      color: centroidsCols,
      size: 20,
      alpha: 0.8
    });

    iteration++;
    lastFrame = context.time;
});
