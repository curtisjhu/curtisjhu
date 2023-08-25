import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// SCENE AND CAMERA
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10);
camera.position.set(1, 1, 1).setLength(4);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// LIGHTS
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// AXES
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// BLOCH SPHERE
const geometry = new THREE.SphereGeometry(1, 32, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xe7e7e7 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// TEXT
const loader = new FontLoader();
loader.load("optimer_bold.typeface.json", function (font) {
    const one = new TextGeometry("| 1 >", {
        height: 0.02,
        size: 0.1,
        font: font,
    });
    const zero = new TextGeometry("| 0 >", {
        height: 0.02,
        size: 0.1,
        font: font,
    });
    const textMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        flatShading: true,
    });
    var oneMesh = new THREE.Mesh(one, textMaterial);
    oneMesh.name = "text";
    scene.add(oneMesh);
	oneMesh.position.y = -1.2;

    var zeroMesh = new THREE.Mesh(zero, textMaterial);
    zeroMesh.name = "text";
    scene.add(zeroMesh);
	zeroMesh.position.y = 1.2;
});

// RENDER
const raycaster = new THREE.Raycaster();
window.addEventListener( 'pointermove', onPointerMove );
let pointer = {x: 0, y: 0};
function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

renderer.setAnimationLoop((_) => {
    controls.update();
	raycaster.setFromCamera( pointer, camera );
    renderer.render(scene, camera);
});

window.addEventListener("resize", onResize);
function onResize(event) {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}
