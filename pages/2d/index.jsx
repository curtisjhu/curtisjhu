import p5 from "p5";

import { Pane } from "tweakpane";

const PARAMS = {
    equation: "x = y",
    windowMin: {
        x: -20,
        y: -20,
    },
    windowMax: {
        x: 20,
        y: 20,
    },
};

const pane = new Pane();
pane.addInput(PARAMS, "equation").on("change", (e) => {
    console.log(e);
});
pane.addInput(PARAMS, "windowMin").on("change", (e) => {});
pane.addInput(PARAMS, "windowMax").on("change", (e) => {});

document.body.style = "margin: 0;";

const sketch = (p) => {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    var optimalPixelSpacing = 45;

    p.draw = function () {
        p.background(255);

        // choosing the interval
        var ydiff = Math.abs(PARAMS.windowMax.y - PARAMS.windowMin.y);
        var xdiff = Math.abs(PARAMS.windowMax.x - PARAMS.windowMin.x);

        var optimalSpacing = Math.min(
            (xdiff * optimalPixelSpacing) / p.width,
            (ydiff * optimalPixelSpacing) / p.height
        );
        console.log(optimalSpacing);

        var places = 1;
        if (optimalSpacing < 1) {
            while (optimalSpacing < 1) {
                optimalSpacing *= 10;
                places *= 10;
            }
        } else {
            while (optimalSpacing > 10) {
                optimalSpacing /= 10;
                places /= 10;
            }
        }
        console.log(places);

        var interval = 1;
        var min = 1000;
        if (Math.abs(optimalSpacing - 1) < min) {
            interval = 1;
            min = Math.abs(optimalSpacing - 1);
        }
        if (Math.abs(optimalSpacing - 2) < min) {
            interval = 2;
            min = Math.abs(optimalSpacing - 2);
        }
        if (Math.abs(optimalSpacing - 5) < min) {
            interval = 5;
            min = Math.abs(optimalSpacing - 5);
        }

        interval = interval * places;
        console.log(interval)

        p.stroke(100);
        p.strokeWeight(4);
        var xorigin = (p.width * Math.abs(PARAMS.windowMin.x)) / xdiff;
        p.line(xorigin, 0, xorigin, p.height);
        var yorigin = (p.height * Math.abs(PARAMS.windowMin.y)) / ydiff;
        p.line(0, yorigin, p.width, yorigin);

        p.strokeWeight(2);
        p.stroke(126);
        for (
            var i = 0;
            i * interval <
            Math.max(
                Math.abs(PARAMS.windowMax.x),
                Math.abs(PARAMS.windowMin.x)
            );
            i++
        ) {
            console.log("alsdkjf")
            p.line(xorigin + p.width * (i * interval) / xdiff, 0, xorigin + p.width * (i * interval) / xdiff, p.height);
            p.line(xorigin - p.width * (i * interval) / xdiff, 0, xorigin - p.width * (i * interval) / xdiff, p.height);
        }
        for (
            var i = 0;
            i * interval <
            Math.max(
                Math.abs(PARAMS.windowMax.y),
                Math.abs(PARAMS.windowMin.y)
            );
            i++
        ) {
            p.line(0, yorigin + p.height * i * interval / ydiff, p.width, yorigin + p.height * i * interval / ydiff);
            p.line(0, yorigin - p.height * i * interval / ydiff, p.width, yorigin - p.height * i * interval / ydiff);
        }


        // draw curve
        p.stroke(200);
        p.beginShape();
        var density = 1000;
        for (var i = 0; i < density; i++) {
            var x = PARAMS.windowMin.x + xdiff * i / density;
            var y = Math.cos(x);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);

    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.mouseDragged = function () {
        
    }
};
const root = new p5(sketch, "app");
