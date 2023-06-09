import * as THREE from "three";
import * as MathBox from "mathbox";

import GUI from "./gui";
import { FUNCTIONS, SETTINGS, WINDOW } from "./consts";

GUI(FUNCTIONS, WINDOW, SETTINGS);

var mathbox = MathBox.mathBox({
    element: document.body,
    controls: {
        klass: THREE.OrbitControls,
    },
    // plugin: ["core", "controls", "cursor", "mathbox"],
});

if (mathbox.fallback) throw "WebGL not supported";

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);

// setting proxy:true allows interactive controls to override base position
var camera = mathbox.camera({
    proxy: true,
    position: [2, 2, 2],
    lookAt: [0, 0, 0]
});

// save as variable to adjust later
var view = mathbox
    .cartesian({
        range: [
            [WINDOW.x.min, WINDOW.x.max],
            [WINDOW.y.min, WINDOW.y.max],
            [WINDOW.z.min, WINDOW.z.max],
        ],
        scale: [2, 1, 2],
    })

export const AXES = {
    x: {
        axis: view.axis({ axis: 1, width: 8, detail: 40, color: "grey" }),
        scale: view.scale({ axis: 1, divide: 5, nice: true, zero: true }),
        ticks: view.ticks({ width: 5, size: 15, color: "grey", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
        }),
        labels: view.label({
            color: "black",
            zIndex: 0,
            offset: [0, -20],
        }),
    },
    y: {
        axis: view.axis({ axis: 2, width: 8, detail: 40, color: "grey" }),
        scale: view.scale({ axis: 2, divide: 5, nice: true, zero: false }),
        ticks: view.ticks({ width: 5, size: 15, color: "grey", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
        }),
        labels: view.label({
            color: "black",
            zIndex: 0,
            offset: [0, 0],
        }),
    },
    z: {
        axis: view.axis({ axis: 3, width: 8, detail: 40, color: "grey" }),
        scale: view.scale({ axis: 3, divide: 5, nice: true, zero: false }),
        ticks: view.ticks({ width: 5, size: 15, color: "grey", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
        }),
        labels: view.label({
            color: "black",
            zIndex: 0,
            offset: [0, 0],
        }),
    },
};

var updateGraphFunc = function () {
    var x = Parser.parse(FUNCTIONS.x).toJSFunction(["t"]);
    var y = Parser.parse(FUNCTIONS.y).toJSFunction(["t"]);
    var z = Parser.parse(FUNCTIONS.z).toJSFunction(["t"]);

    curveDomain.set("range", [[SETTINGS.t.min, SETTINGS.t.max]]);
    tubeDomain.set("range", [
        [SETTINGS.t.min, SETTINGS.t.max],
        [0, 6.282],
    ]);

    var dt = (SETTINGS.t.max - SETTINGS.t.min) / SETTINGS.segments;
    var epsilon = 0.000001;

    curveData.set("expr", function (emit, t, i, time) {
        // head, then tail.
        emit(x(t), z(t), y(t));
        emit(x(t - dt), z(t - dt), y(t - dt));
    });

    var position = function (t) {
        return new THREE.Vector3(x(t), y(t), z(t));
    };

    var tangent = function (t) {
        return new THREE.Vector3()
            .subVectors(position(t + epsilon), position(t))
            .normalize();
    };

    var normal = function (t) {
        return new THREE.Vector3()
            .subVectors(tangent(t + epsilon), tangent(t))
            .normalize();
    };

    var binormal = function (t) {
        return new THREE.Vector3().crossVectors(tangent(t), normal(t));
    };

    tubeData.set("expr", function (emit, u, v, i, j, time) {
        var P = position(u);
        var N = normal(u).multiplyScalar(tubeRadius);
        var B = binormal(u).multiplyScalar(tubeRadius);

        // var M = P.add(N.multiplyScalar(Math.cos(v))).add(
        //     B.multiplyScalar(Math.sin(v))
        // );

        emit(P.x, P.y, P.z);
    });

    view.set("range", [
        [WINDOW.x.min, WINDOW.x.max],
        [WINDOW.y.min, WINDOW.y.max],
        [WINDOW.z.min, WINDOW.z.max],
    ]);

    // start of color options =============================================
    if (graphColorStyle == "Solid Blue") {
        // just a solid blue color
        tubeColors.set("expr", function (emit, u, v, i, j, t) {
            emit(0.5, 0.5, 1.0, 1.0);
        });
    } else if (graphColorStyle == "Rainbow Along T") {
        tubeColors.set("expr", function (emit, u, v, i, j, t) {
            var percent = (u - tMin) / (tMax - tMin);
            var color = new THREE.Color(0xffffff);
            color.setHSL(percent, 1, 0.5);
            emit(color.r, color.g, color.b, 1.0);
        });
    }
};


// tubeData, tubeView
var tubeDomain = mathbox.cartesian({
    range: [
        [SETTINGS.t.min, SETTINGS.t.max],
        [0, 6.282],
    ], // u and v
});

var tubeData = tubeDomain.area({
    width: SETTINGS.segments,
    height: SETTINGS.radiusSegments,
    expr: function (emit, u, v, i, j, t) {
        emit();
    },
    axes: [1, 2], // u,v
    channels: 3, // 3D space
});

var tubeColors = tubeDomain.area({
    width: SETTINGS.segments,
    height: SETTINGS.radiusSegments,
    channels: 4, // RGBA
});

view.surface({
    points: tubeData,
    fill: false,
    shaded: false,
    lineX: true,
    lineY: true,
    width: 1,
    color: "black",
});

updateGraphFunc();
