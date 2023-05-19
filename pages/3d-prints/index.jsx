import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { Pane } from "tweakpane";
import * as InfodumpPlugin from "tweakpane-plugin-infodump";

const pane = new Pane();
pane.registerPlugin(InfodumpPlugin);
pane.addBlade({
    view: "infodump",
    content: "STL Talent Show",
    border: false,
    markdown: false,
});

var PARAMS = {
    file: "pulley.stl"
}
pane.addInput(PARAMS, 'file');

function STLViewer(model, elementID) {
    var elem = document.getElementById(elementID);
    document.body.style = "margin: 0";
    elem.style = "width: 100%; height: 100vh";

    var camera = new THREE.PerspectiveCamera(
        70,
        elem.clientWidth / elem.clientHeight,
        1,
        1000
    );

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener(
        "resize",
        function () {
            renderer.setSize(elem.clientWidth, elem.clientHeight);
            camera.aspect = elem.clientWidth / elem.clientHeight;
            camera.updateProjectionMatrix();
        },
        false
    );

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.05;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;

    var scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

    new STLLoader().load(model, function (geometry) {
        var material = new THREE.MeshPhongMaterial({
            color: 0xff5533,
            specular: 100,
            shininess: 100,
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);
        mesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
        );

        var largestDimension = Math.max(
            geometry.boundingBox.max.x,
            geometry.boundingBox.max.y,
            geometry.boundingBox.max.z
        );
        camera.position.x = largestDimension * 4.0;

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    });
}

window.onload = function () {
    STLViewer(PARAMS.file, "app");
};
