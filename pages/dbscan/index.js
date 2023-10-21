const regl = require("regl")();
const d3 = require("../d3.min.js");
const { Pane } = require("tweakpane")
const TweakpaneLatexPlugin = require("tweakpane-latex")
const { funcs,colorList } = require("./funcs.js")

const pane = new Pane({
  title: "DBSCAN Algorithm (Prototype I)"
})

pane.registerPlugin(TweakpaneLatexPlugin);
pane.addBlade({
  view: "latex",
  content: `
The infamous DBSCAN algorithm.

TODO:
I think there is an edge case where, if it is a nonCore of two groups it gets added to both.
`,
  border: false,
  markdown: true,
});

const url = new URLSearchParams(window.location.search);
const maxSpeed = 4;
const settings = {
    function: url.get("function") || "clusters",
    n: parseInt(url.get("n")) || 100,
    groups: parseInt(url.get("groups")) || 20,
    speed: 0.8 * maxSpeed,
    std: parseFloat(url.get("std")) || 0.3,
    minPoints: parseInt(url.get("minPoints")) || 4,
    epsilon: parseFloat(url.get("epsilon")) || 0.3
};

var optionList = {};
for (let k in funcs) {
  optionList[k] = k;
}
console.log(optionList)
pane.addInput(settings, "function", {
  options: optionList
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?function='+ev.value);
  window.location.reload();
});
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
pane.addInput(settings, "std", {
  min: 0.01,
  max: 1 
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?std='+ev.value);
  window.location.reload();
});
pane.addInput(settings, "minPoints", {
  step: 1,
  min:1,
  max: 10
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?minPoints='+ev.value);
  window.location.reload();
});
pane.addInput(settings, "epsilon", {
  min: 0.01,
  max: 3 
}).on("change", (ev) => {
  window.history.replaceState(null, null, '?epsilon='+ev.value);
  window.location.reload();
});

const btn = pane.addButton({
  title: 'refresh',
});
btn.on('click', () => {
  window.location.reload();
});



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
  iteration = 0;
  previousCentroidsXY = null;
})

let iteration = 0;
var {xy, cols} = funcs[settings.function](settings);
let lastFrame = 0;


var toCheck = xy.map((e) => e);

function findCorePoints() {
  // highlight the core points
  var corePoints = xy.map((_) => 0);
  for (var i = 0; i < xy.length; i++) {
    for (var j = i+1; j < xy.length; j++) {
      var dist = Math.sqrt(Math.pow(xy[i][0] - xy[j][0], 2) + Math.pow(xy[i][1] - xy[j][1], 2));
      if (dist < settings.epsilon) {
        corePoints[i]++;
        corePoints[j]++;
      }
    }
  }

  var returnVal = [];
  for (var i =0; i< corePoints.length; i++) {
    if (corePoints[i] >= settings.minPoints) {
      returnVal.push(i);
    }
  }
  return returnVal;
}


var corePoints = findCorePoints();
var clusters = [[]];
var currentCluster = 0;
var toCheck = [corePoints[0]];

var iterateCorepoints = true;
regl.frame((context) => {
  if (context.time - lastFrame < maxSpeed - settings.speed) {
    return;
  }

  // iterate corepoints. add them to cluster.
  // don't worry about performance right now
  if (iterateCorepoints) {

    // next closest corePoint;
    // very low performance, might need to change later.
    var nextToCheck = [];
    var nonCores = []

    for (var j = 0; j < toCheck.length; j++) {
      for (var i = 0; i < xy.length; i++) {
        var c = xy[toCheck[j]];
        var dist = Math.sqrt(Math.pow(c[0] - xy[i][0],2) + Math.pow(c[1] - xy[i][1], 2));
        if (dist < settings.epsilon) {
          if (corePoints.includes(i) && !clusters[currentCluster].includes(i) && !nextToCheck.includes(i)) {
            nextToCheck.push(i);
          } else if (!clusters[currentCluster].includes(i) && !nextToCheck.includes(i)) {
            nonCores.push(i);
          }
        }
      }
    }

    // next time around check all the neighbors.
    // this time add these neighbors to our cluster.
    toCheck = nextToCheck;

    clusters[currentCluster] = clusters[currentCluster].concat(toCheck);
    clusters[currentCluster] = clusters[currentCluster].concat(nonCores);

    // if nothing can be added to previous cluster
    // start at next corepoint
    if (toCheck.length === 0) {
      currentCluster++;
      clusters[currentCluster] = [];
      toCheck = [corePoints[0]];
    }

    // remove toCheck from corePoints.
    corePoints = corePoints.filter(e => !toCheck.includes(e));

    if (corePoints.length == 0) {
      iterateCorepoints = false;
    }

  } else {
    console.log("done")
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


    var shellsXY = []
    var colorsXY = []
    for (var i = 0; i < clusters.length; i++) {
      for (var j = 0; j < clusters[i].length; j++) {
        var pointInd = clusters[i][j];
        shellsXY.push(xy[pointInd]);
        colorsXY.push(colorList[i+1]);
      }
    }
    drawPoints({
      xy: shellsXY,
      color: colorsXY,
      size: settings.epsilon*100,
      alpha: 0.3
    });

    iteration++;
    lastFrame = context.time;
});
