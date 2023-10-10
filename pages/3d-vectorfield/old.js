const VectorField = require("vector-field");

let time = 0;
const directionFn = ([x, y, z]) => {
  const n = myNoise4D(x, y, z, time);
  const theta = n;
  const phi = n;

  return [
    Math.sin(theta) * Math.sin(phi),
    Math.cos(theta),
    Math.sin(theta) * Math.cos(phi),
  ];
};
const vectorField = new VectorField(directionFn, [12, 6, 6], 1);

const frame = () => {
  time += 0.001;
  vectorField.update();
  requestAnimationFrame(frame);
};

requestAnimationFrame(() => {
  frame();
});