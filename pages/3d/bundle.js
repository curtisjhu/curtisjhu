import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";


// perlin noise
// choose grid size
var randGrid = [], len = 5, amp = 0.5;
for (var i=0; i< len;i++) {
  var row = []
  for (var j=0; j< len;j++) {
    row.push([2*Math.random()-1, 2*Math.random()-1, amp*Math.random() - amp/2]);
  }
  randGrid.push(row);
}


const functionList = {
  "paraboloid": (x, y) => (x*x + y*y),
  "gradients": (x, y) => (Math.sin(x * y * Math.PI) * Math.cos(y * y * Math.PI * 0.5) * 0.75),
  "hyperbolic_paraboloid": (x, y) => (1-x*x+y*y),
  "valley": (x, y) => (x*x - y*y) * Math.exp(-x*x-y*y),
  "dome": (x, y) => (2 - x*x - y*y),
  "horsesaddle": (x, y) => (x*x - y*y),
  "inaccurate_gravitational_potential": (x, y) => (1 - 0.7*Math.exp(-5*(x*x+y*y))),
  "eggbox": (x, y) => 0.2*(Math.sin(7*x) + Math.cos(7*y)),
  "waves": (x, y) => 0.2*Math.cos(8*Math.sqrt(x*x + y*y)),
  "perlin_noise": (x, y) => {
    var xBounds = [-1, 1], yBounds = [-1, 1];
    var dx = (xBounds[1]-xBounds[0])/len;
    var dy = (yBounds[1]-yBounds[0])/len;

    function clamp(val) {
      return Math.min(Math.max(val, 0), len-1);
    }

    var x0 = clamp(Math.floor((x-xBounds[0])/dx)), x1 = clamp(Math.ceil((x-xBounds[0])/dx));
    var y0 = clamp(Math.floor((y-yBounds[0])/dy), 0), y1 = clamp(Math.ceil((y-yBounds[0])/dy), len-1);

    function sigmoid(u) {
      return 1 / (1 + Math.exp(-u));
    }

    var one = sigmoid((x-x0)/dx);
    var res = (1-one)*randGrid[x0][y0][2] + one*randGrid[x1][y0][2];
    var two = sigmoid((y-y0)/dy);
    res += (1-two)*randGrid[x0][y0][2] + two*randGrid[x0][y1][2];
    res += (1-one)*randGrid[x0][y1][2] + one*randGrid[x1][y1][2];
    res += (1-two)*randGrid[x1][y0][2] + two*randGrid[x1][y1][2];

    return res / 2;
  },
  "quad": (x, y) =>  {
    return 2.5*Math.pow(x, 4) - 2*x*x + 2.5*Math.pow(y, 4) - 2*y*y + 1
  },
  "gaussian_bell": (x, y) => 0.7*Math.exp(-3*(x*x + y*y))
}

var options = "";
for (let key in functionList) {
  options += `<option value='${key}'>${key}</option>`;
}

var elem = `
  <div style="position:sticky">
    <select name="function" id="function">
      ${options}
    </select>
  </div>
`;

document.body.innerHTML = elem;
document
  .getElementById("function")
  .addEventListener("change", (e) => {
    console.log(e.target.value);
    document.location.search = "function="+e.target.value;
  })


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10);
camera.position.set(1, 1, 1).setLength(4);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let grid = new THREE.GridHelper(2, 20, 0xc6c6c6, 0xc6c6c6);
grid.position.y = -0.001;
scene.add(grid, new THREE.AxesHelper(1));

let graphGeom = new THREE.PlaneGeometry(2, 2, 20, 20);
graphGeom.rotateX(Math.PI * -0.5);
let graphMat = new THREE.MeshNormalMaterial({side: THREE.DoubleSide, wireframe: false});
let graph = new THREE.Mesh(graphGeom, graphMat);

// function graphing
var url = new URLSearchParams(window.location.search);
var defaultGraph = url.get("function") || "gradients";
console.log(defaultGraph)

document.getElementById("function").value = defaultGraph;

let pos = graphGeom.attributes.position;
for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
    let z = pos.getZ(i);
    let y = functionList[defaultGraph](x, z);
    pos.setY(i, y);
}
graphGeom.computeVertexNormals();

scene.add(graph);

window.addEventListener("resize", onResize);

renderer.setAnimationLoop(_ => {
  renderer.render(scene, camera);
})

function onResize(event) {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

