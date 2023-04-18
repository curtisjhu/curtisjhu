import p5 from "p5";

import { Pane } from "tweakpane";

const PARAMS = {
    equation: "hello",
};

const pane = new Pane();
pane.addInput(PARAMS, "equation").on("change", (e) => {
	console.log(e);
});

document.body.style = "margin: 0; height: 100vh; width: 100vw;";
var width = document.body.clientWidth;
var height = document.body.clientHeight;
document.addEventListener("resize", () => {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
});

const sketch = (p) => {
    let x = 100;
    let y = 100;

    p.setup = function () {
        p.createCanvas(width, height);
    };

    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
    };
};
const root = new p5(sketch, "app");
