import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10);
camera.position.set(1, 1.5, 1).setLength(2.5);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x161616);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let grid = new THREE.GridHelper(2, 20, 0xffff00, 0xffff00);
grid.position.y = -0.001;
scene.add(grid, new THREE.AxesHelper(1));

let graphGeom = new THREE.PlaneGeometry(2, 2, 20, 20);
graphGeom.rotateX(Math.PI * -0.5);
let graphMat = new THREE.MeshNormalMaterial({side: THREE.DoubleSide, wireframe: false});
let graph = new THREE.Mesh(graphGeom, graphMat);

// f(x,z)
let pos = graphGeom.attributes.position;
for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
  let z = pos.getZ(i);
    pos.setY(i, Math.sin(x * z * Math.PI) * Math.cos(z * z * Math.PI * 0.5) * 0.75);
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

