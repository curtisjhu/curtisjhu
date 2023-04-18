import * as THREE from "three";
import * as MathBox from "mathbox";

import GUI from "./gui";
import { FUNCTIONS, SETTINGS, WINDOW } from "./consts";

GUI(FUNCTIONS, WINDOW, SETTINGS);

var mathbox = MathBox.mathBox({
  plugin: ['core', 'controls', 'cursor', 'mathbox'],
});

if (mathbox.fallback) throw "WebGL not supported";

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);


// setting proxy:true allows interactive controls to override base position
var camera = mathbox.camera({
    proxy: true,
    position: [2, 1, 2],
});

// save as variable to adjust later
var view = mathbox.cartesian({
    range: [
        [WINDOW.x.min, WINDOW.x.max],
        [WINDOW.y.min, WINDOW.y.max],
        [WINDOW.z.min, WINDOW.z.max],
    ],
    scale: [2, 1, 2],
});


view.grid({ axes: [1, 3], width: 2, divideX: 20, divideY: 20, opacity: 0.25 });

export const AXES = {
    x: {
        axis: view.axis({ axis: 1, width: 8, detail: 40, color: "red" }),
        scale: view.scale({ axis: 1, divide: 10, nice: true, zero: true }),
        ticks: view.ticks({ width: 5, size: 15, color: "red", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
            // source: AXES.x.scale,
        }),
        labels: view.label({
            color: "red",
            zIndex: 0,
            offset: [0, -20],
            // points: AXES.x.scale,
            // text: AXES.x.format,
        })

    },
    y: {
        axis: view.axis({ axis: 3, width: 8, detail: 40, color: "green" }),
        scale: view.scale({ axis: 3, divide: 5, nice: true, zero: false }),
        ticks: view.ticks({ width: 5, size: 15, color: "green", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
            // source: AXES.y.scale,
        }),
        labels: view.label({
            color: "green",
            zIndex: 0,
            offset: [0, 0],
            // points: AXES.y.scale,
            // text: AXES.y.format,
        })
    },
    z: {
        axis: view.axis({ axis: 2, width: 8, detail: 40, color: "blue" }),
        scale: view.scale({ axis: 2, divide: 5, nice: true, zero: false }),
        ticks: view.ticks({ width: 5, size: 15, color: "blue", zBias: 2 }),
        format: view.format({
            digits: 2,
            font: "Arial",
            weight: "bold",
            style: "normal",
            // source: AXES.z.scale,
        }),
        labels: view.label({
            color: "blue",
            zIndex: 0,
            offset: [0, 0],
            // points: AXES.z.scale,
            // text: AXES.z.format,
        })
    }
}


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

        var M = P.add(N.multiplyScalar(Math.cos(v))).add(
            B.multiplyScalar(Math.sin(v))
        );

        emit(M.x, M.y, M.z);
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

// curveData, curveView
var curveDomain = mathbox.cartesian({
    range: [[SETTINGS.t.min, SETTINGS.t.max]],
});

var curveData = curveDomain.interval({
    width: SETTINGS.segments,
    expr: function (emit, t, i, time) {
        var dt = (SETTINGS.t.max - SETTINGS.t.min) / SETTINGS.segments;
        // head, then tail.
        emit(Math.cos(t), t, Math.sin(t));
        emit(Math.cos(t - dt), t - dt, Math.sin(t - dt));
    },
    channels: 3, // 3D space
    items: 2, // emit two vertices per line segment; required by view.
});

var curveView = view.vector({
    points: curveData,
    width: 4,
    // expr: set later
    color: "purple",
    start: false,
});

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
    expr: function (emit, u, v, i, j, time) {
        emit(u, v, u + v);
    },
    axes: [1, 2], // u,v
    channels: 3, // 3D space
});

var tubeColors = tubeDomain.area({
    width: SETTINGS.segments,
    height: SETTINGS.radiusSegments,
    // expr: set later
    channels: 4, // RGBA
});

var tubeViewFill = view.surface({
    points: tubeData,
    fill: true,
    shaded: false,
    lineX: false,
    lineY: false,
    color: "white",
    colors: tubeColors,
});

var tubeViewLine = view.surface({
    points: tubeData,
    fill: false,
    shaded: false,
    lineX: true,
    lineY: true,
    width: 1,
    color: "black",
});


updateGraphFunc();
